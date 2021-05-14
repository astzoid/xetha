import Logger from '../utils/Logger';
import Authenticator from './Authenticator';
import type { Socket } from 'socket.io';
import type { Tokens } from './Tokenizer';

export default function WebSocketHandler(socket: Socket) {
    Logger.info(`[CLIENT] ${socket.id} connected.`);

    let authenticated = false;

    socket.on('auth', async (tokens: Tokens) => {
        if (authenticated)
            return socket.emit('auth:error', new Error(`Bad Request`), 400);

        if (
            typeof tokens !== 'object' ||
            typeof tokens?.accessToken !== 'string' ||
            typeof tokens?.refreshToken !== 'string'
        )
            return socket.emit('auth:error', new Error(`Bad Request`), 400);

        if (!tokens.accessToken || !tokens.refreshToken)
            return socket.emit('auth:success', null);

        try {
            await Authenticator(socket, tokens);
            authenticated = true;
            return true;
        } catch (err) {
            Logger.error(err);
            return socket.emit('auth:error', new Error(err.message), 500);
        }
    });

    socket.emit('ready');
}
