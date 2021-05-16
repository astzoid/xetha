import Logger from '../utils/Logger';
import { User } from '@shared/database';
import { validateTokens } from '../functions/JWTService';
import type { Socket } from 'socket.io';
import type { Tokens } from '../ws/Tokenizer';

export default async function Authenticator(
    socket: Socket,
    tokens: Required<Tokens>,
) {
    const userAuth = await validateTokens(
        tokens.accessToken,
        tokens.refreshToken,
    );

    if (!userAuth) return null;
    if (userAuth.tokens) {
        tokens = userAuth.tokens;
        socket.emit('auth:token', userAuth.tokens);
    }

    const interval = setInterval(async () => {
        try {
            Logger.info(`[client] ${socket.id} refreshing...`);

            const auth = await validateTokens(
                tokens.accessToken,
                tokens.refreshToken,
            );

            if (auth && auth.tokens) {
                tokens = auth.tokens;
                socket.emit('auth:token', auth.tokens);
                Logger.info(`[client] ${socket.id} refreshed`);
            }

            if (!auth) {
                socket.emit('auth:logout');
                clearInterval(interval);
                Logger.info(`[client] ${socket.id} logout`);
            }
        } catch (err) {
            Logger.error(err);
            clearInterval(interval);
            socket.emit('auth:error', new Error(err.message), 500);
        }
    }, 290000);

    socket.on('disconnect', () => clearInterval(interval));

    return User.findOne({ user_id: userAuth.user_id });
}
