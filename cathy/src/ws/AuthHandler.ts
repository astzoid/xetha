import Serialize from '../functions/Serialize';
import Logger from '../utils/Logger';
import Authenticator from '../auth/Authenticator';
import ProtectedRoutes from '../routes/protected';
import type { Socket } from 'socket.io';
import type { Tokens } from './Tokenizer';
import type DoneCallback from '../utils/DoneCallback';

export default async function AuthHandler(socket: Socket, tokens: Tokens) {
    if (
        typeof tokens !== 'object' ||
        typeof tokens?.accessToken !== 'string' ||
        typeof tokens?.refreshToken !== 'string'
    )
        return socket.emit('auth:error', new Error(`Bad Request`), 400);

    if (!tokens.accessToken || !tokens.refreshToken)
        return socket.emit('auth:success', null);

    try {
        const user = await Authenticator(socket, tokens);

        if (user) {
            socket.on(
                'request:protected',
                (
                    path: string,
                    query: Record<string, any>,
                    done: DoneCallback,
                ) => {
                    ProtectedRoutes(user, path, query, done);
                },
            );
        }

        return socket.emit(
            'auth:success',
            user ? Serialize(user.toJSON()) : null,
        );
    } catch (err) {
        Logger.error(err);
        return socket.emit('auth:error', new Error(err.message), 500);
    }
}
