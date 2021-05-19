import type { Socket } from 'socket.io';
import type { Guild, GuildChannelManager, RoleManager } from 'discord.js';
import type { DisclosureSharder } from 'disclosure-discord';
import type { DiscordGuild } from '@shared/types';
import type Acknowledge from '../Acknowledge';

export default function GuildRoute(manager: DisclosureSharder, socket: Socket) {
    socket.on('guild', async (guild_id: string, done: Acknowledge) => {
        if (typeof guild_id !== 'string' || typeof done !== 'function') return;
        try {
            const shards = await manager.broadcastEval(
                `this.guilds.cache.get('${guild_id}')`,
            );

            const guild = shards.find((s) => s) as Guild;

            if (guild) {
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

                done(null, payload);
            } else {
                done(null, null);
            }
        } catch (err) {
            done(err);
        }
    });

    socket.on('guildUpdate', async (guild_id: string, done: Acknowledge) => {
        if (typeof guild_id !== 'string' || typeof done !== 'function') return;
        try {
            await manager.broadcastEval(
                `this.emit('guildDataUpdate', '${guild_id}')`,
            );

            done(null, true);
        } catch (err) {
            done(err);
        }
    });
}
