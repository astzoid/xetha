import { Router } from 'express';
import { Permissions, GuildMember } from 'discord.js';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';
import type { DiscordGuildMember } from '@shared/types';

export default function MemberRoute(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/:guild_id/:member_id',
        AsyncWrapper(async (req, res) => {
            const { guild_id } = req.params;
            const { member_id } = req.params;

            const shards = await manager.broadcastEval(`
        (async () => {
            const guild = 
            const member = await this.guilds.cache.get('${guild_id}').members.fetch('${member_id}');
            if (!member) return null;
            return {
                permissions: member.permissions,
                user: {
                    username: member.user.username,
                    discriminator: member.user.discriminator,
                    avatar: member.user.avatar,
                },
            };
        })();
        `);

            const member = shards.find((s) => s) as GuildMember;

            if (!member)
                return res
                    .status(404)
                    .json({ message: 'Guild Member Not Found' });

            const permissions = new Permissions(member.permissions);

            const payload: DiscordGuildMember = {
                guild_id,
                member_id: member.id,
                username: member.user.username,
                discriminator: member.user.discriminator,
                avatar: member.user.avatar,
                dashboard: permissions.has('ADMINISTRATOR'),
            };

            return res.status(200).json(payload);
        }),
    );

    return route;
}
