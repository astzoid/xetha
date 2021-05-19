import { Permissions, GuildMember } from 'discord.js';
import type { Socket } from 'socket.io';
import type { DisclosureSharder } from 'disclosure-discord';
import type { DiscordGuildMember } from '@shared/types';
import type Acknowledge from '../Acknowledge';

export default function MemberRoute(
    manager: DisclosureSharder,
    socket: Socket,
) {
    socket.on(
        'member',
        async (guild_id: string, member_id: string, done: Acknowledge) => {
            if (
                typeof guild_id !== 'string' ||
                typeof member_id !== 'string' ||
                typeof done !== 'function'
            )
                return;
            try {
                const shards = await manager.broadcastEval(`
                    (async () => {
                        const guild = this.guilds.cache.get('${guild_id}');
                        if (!guild) return null;

                        const member = await guild.members.fetch('${member_id}');
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

                if (member) {
                    const permissions = new Permissions(member.permissions);

                    const payload: DiscordGuildMember = {
                        guild_id,
                        member_id,
                        username: member.user.username,
                        discriminator: member.user.discriminator,
                        avatar: member.user.avatar,
                        dashboard: permissions.has('ADMINISTRATOR'),
                    };

                    done(null, payload);
                } else {
                    done(null, null);
                }
            } catch (err) {
                done(err);
            }
        },
    );
}
