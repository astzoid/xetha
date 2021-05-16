import Serialize from '../functions/Serialize';
import Logger from '../utils/Logger';
import Authenticator from '../auth/Authenticator';
import type { Socket } from 'socket.io';
import type { Tokens } from './Tokenizer';

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
        return socket.emit(
            'auth:success',
            user ? Serialize(user.toJSON()) : null,
        );
    } catch (err) {
        Logger.error(err);
        return socket.emit('auth:error', new Error(err.message), 500);
    }
}
