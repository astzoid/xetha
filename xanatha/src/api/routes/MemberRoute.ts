import { Router } from 'express';
import Member from '../../database/models/Member';
import { BlacklistedAttributes } from '../../database/models/Blacklisted';
import { Permissions } from 'discord.js';
import AsyncWrapper from '@xetha/async-wrapper';
import { DisclosureSharder } from 'disclosure-discord';

export default function MemberRoute(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/:guild_id/:member_id',
        AsyncWrapper(async (req, res) => {
            const guild_id = req.params.guild_id;
            const member_id = req.params.member_id;

            const blacklisted = (await manager.broadcastEval(
                `this.managers.blacklist.getUser('${member_id}')`,
                0,
            )) as BlacklistedAttributes;

            if (blacklisted) {
                return res.status(403).json({
                    message: 'User is Blacklisted',
                    reason: blacklisted.reason,
                    issued_by: blacklisted.moderator,
                    issued_at: blacklisted.date,
                });
            }

            const shards = await manager.broadcastEval(`
        (async () => {
            const guild = 
            const member = await this.guilds.cache.get('${guild_id}').members.fetch('${member_id}');
            if (!member) return null;
            return {
                permissions: member.permissions,
                user: {
                    tag: member.user.tag,
                    username: member.user.username,
                    discriminator: member.user.discriminator,
                    avatarURL: member.user.displayAvatarURL({ dynamic: true }),
                },
            };
        })();
        `);

            const member = shards.find((s) => s);

            if (!member) {
                return res
                    .status(404)
                    .json({ message: 'Guild Member Not Found' });
            }

            let data = await Member.findOne({ guild_id, member_id });

            if (!data)
                data = new Member({
                    guild_id,
                    member_id,
                    tag: member.user.tag,
                });

            const permissions = new Permissions(member.permissions);

            res.status(200).json({
                guild_id: guild_id,
                member_id: member.id,
                tag: member.user.tag,
                username: member.user.username,
                discriminator: member.user.discriminator,
                avatarURL: member.user.displayAvatarURL,
                dashboard: permissions.has('ADMINISTRATOR'),
                data: data ? data.toJSON() : null,
            });
        }),
    );

    route.post(
        '/:guild_id/:member_id',
        AsyncWrapper(async (req, res) => {
            const guild_id = req.params.guild_id;
            const member_id = req.params.member_id;

            const data = await Member.findOne({ guild_id, member_id });

            if (!data) {
                return res
                    .status(404)
                    .json({ message: 'Guild Member Data Not Found' });
            }

            await data.update(req.body);

            res.status(200).json(data.toJSON());
        }),
    );

    return route;
}
