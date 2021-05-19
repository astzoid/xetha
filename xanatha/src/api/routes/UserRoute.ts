import type { Socket } from 'socket.io';
import type { User } from 'discord.js';
import type { DisclosureSharder } from 'disclosure-discord';
import type { DiscordUser } from '@shared/types';
import type Acknowledge from '../Acknowledge';

export default function UserRoute(manager: DisclosureSharder, socket: Socket) {
    socket.on('user', async (user_id: string, done: Acknowledge) => {
        if (typeof user_id !== 'string' || typeof done !== 'function') return;
        try {
            const user = (await manager.broadcastEval(
                `this.users.fetch('${user_id}').catch(() => { });`,
                0,
            )) as User;

            if (user) {
                const payload: DiscordUser = {
                    id: user.id,
                    username: user.username,
                    discriminator: user.discriminator,
                    avatar: user.avatar,
                };

                done(null, payload);
            } else {
                done(null, null);
            }
        } catch (err) {
            done(err);
        }
    });
}
