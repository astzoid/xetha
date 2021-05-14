import Logger from '../utils/Logger';
import { User } from '@shared/database';
import { validateTokens } from '../functions/JWTService';
import Serialize from '../functions/Serialize';
import type { Socket } from 'socket.io';
import type { Tokens } from './Tokenizer';

export default async function Authenticator(
    socket: Socket,
    tokens: Required<Tokens>,
) {
    const userAuth = await validateTokens(
        tokens.accessToken,
        tokens.refreshToken,
    );

    if (!userAuth) return socket.emit('auth:success', null);
    if (userAuth.tokens) {
        tokens = userAuth.tokens;
        socket.emit('auth:token', userAuth.tokens.accessToken);
    }

    const interval = setInterval(async () => {
        try {
            Logger.info(`[CLIENT] ${socket.id} refreshing...`);

            const auth = await validateTokens(
                tokens.accessToken,
                tokens.refreshToken,
            );

            if (auth && auth.tokens) {
                tokens = auth.tokens;
                socket.emit('auth:token', auth.tokens.accessToken);
                Logger.info(`[CLIENT] ${socket.id} refreshed`);
            }

            if (!auth) {
                socket.emit('auth:logout');
                clearInterval(interval);
                Logger.info(`[CLIENT] ${socket.id} logout`);
            }
        } catch (err) {
            Logger.error(err);
            clearInterval(interval);
            socket.emit('auth:error', new Error(err.message), 500);
        }
    }, 290000);

    socket.on('disconnect', () => clearInterval(interval));

    const user = await User.findOne({ user_id: userAuth.user_id });

    return socket.emit('auth:success', Serialize(user?.toJSON()));
}
