import { Router } from 'express';
import type { Guild, GuildChannelManager, RoleManager } from 'discord.js';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';
import type { DiscordGuild } from '@shared/types';

export default function GuildRoute(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/:guild_id',
        AsyncWrapper(async (req, res) => {
            const guild_id = req.params.guild_id as string;
            const shards = await manager.broadcastEval(
                `this.guilds.cache.get('${guild_id}')`,
            );

            const guild = shards.find((s) => s) as Guild;

            if (!guild)
                return res.status(404).json({ message: 'Guild Not Found' });

            const channelShards: GuildChannelManager[] =
                await manager.broadcastEval(
                    `this.guilds.cache.get('${guild_id}').channels`,
                );
            const roleShards: RoleManager[] = await manager.broadcastEval(
                `this.guilds.cache.get('${guild_id}').roles`,
            );

            const channels = channelShards.find((s) => s);
            const roles = roleShards.find((s) => s);

            const payload: DiscordGuild = {
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                memberCount: guild.memberCount,
                channels:
                    channels?.cache
                        .sort((a, b) => b.rawPosition - a.rawPosition)
                        .map((c) => {
                            return {
                                id: c.id,
                                name: c.name,
                                type: c.type,
                                parent: c.parentID,
                            };
                        }) ?? [],
                roles:
                    roles?.cache
                        .filter((r) => !r.managed && r.name !== '@everyone')
                        .sort((a, b) => b.rawPosition - a.rawPosition)
                        .map((r) => {
                            return {
                                id: r.id,
                                name: r.name,
                                color: r.hexColor,
                            };
                        }) ?? [],
            };

            return res.status(200).json(payload);
        }),
    );

    route.post(
        '/:guild_id',
        AsyncWrapper(async (req, res) => {
            const guild_id = req.params.guild_id as string;
            await manager.broadcastEval(
                `this.emit('guildDataUpdate', '${guild_id}')`,
            );
            return res.status(200).json({ message: 'Guild Updated.' });
        }),
    );

    return route;
}
