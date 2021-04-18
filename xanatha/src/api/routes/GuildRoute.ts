import { Router } from 'express';
import {
    Guild as DiscordGuild,
    GuildChannelManager,
    RoleManager,
} from 'discord.js';
import Guild from '../../database/models/Guild';
import { BlacklistedAttributes } from '../../database/models/Blacklisted';
import AsyncWrapper from '@xetha/async-wrapper';
import { DisclosureSharder } from 'disclosure-discord';

export default function GuildRoute(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/:guild_id',
        AsyncWrapper(async (req, res) => {
            const guild_id = req.params.guild_id as string;

            const blacklisted = (await manager.broadcastEval(
                `this.managers.blacklist.getServer('${guild_id}')`,
                0,
            )) as BlacklistedAttributes;

            if (blacklisted) {
                return res.status(403).json({
                    message: 'Guild is Blacklisted',
                    reason: blacklisted.reason,
                    issued_by: blacklisted.moderator,
                    issued_at: blacklisted.date,
                });
            }

            const shards = await manager.broadcastEval(
                `this.guilds.cache.get('${guild_id}')`,
            );

            const guild = shards.find((s) => s) as DiscordGuild;

            if (!guild) {
                return res.status(404).json({ message: 'Guild Not Found' });
            }

            const channelShards: GuildChannelManager[] = await manager.broadcastEval(
                `this.guilds.cache.get('${guild_id}').channels`,
            );
            const roleShards: RoleManager[] = await manager.broadcastEval(
                `this.guilds.cache.get('${guild_id}').roles`,
            );

            const channels = channelShards.find((s) => s);
            const roles = roleShards.find((s) => s);

            let settings = await Guild.findOne({ guild_id });

            if (!settings)
                settings = await Guild.create({ guild_id, name: guild.name });

            res.status(200).json({
                id: guild.id,
                name: guild.name,
                settings: settings.toJSON(),
                channels: channels.cache
                    .sort((a, b) => b.rawPosition - a.rawPosition)
                    .map((c) => {
                        return {
                            id: c.id,
                            name: c.name,
                            type: c.type,
                            parent: c.parentID,
                        };
                    }),
                roles: roles.cache
                    .filter((r) => !r.managed && r.name !== '@everyone')
                    .sort((a, b) => b.rawPosition - a.rawPosition)
                    .map((r) => {
                        return {
                            id: r.id,
                            name: r.name,
                            color: r.hexColor,
                        };
                    }),
            });
        }),
    );

    route.post(
        '/:guild_id',
        AsyncWrapper(async (req, res) => {
            const guild_id = req.params.guild_id as string;

            const guild = await Guild.findOne({ guild_id });

            if (!guild) {
                return res.status(404).json({ message: 'Guild Not Found' });
            }

            await guild.update(req.body);

            manager.broadcastEval(
                `this.emit('guildDataUpdate', '${guild_id}')`,
            );

            res.status(200).json(guild.toJSON());
        }),
    );

    return route;
}
