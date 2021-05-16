import AuthHandler from './AuthHandler';
import Logger from '../utils/Logger';
import type { Socket } from 'socket.io';
import type { Tokens } from './Tokenizer';

export default function WebSocketHandler(socket: Socket) {
    Logger.info(`[client] ${socket.id} connected.`);

    let authenticated = false;

    socket.on('auth', async (tokens: Tokens) => {
        if (authenticated) {
            socket.emit('auth:error', new Error(`Bad Request`), 400);
        } else {
            authenticated = await AuthHandler(socket, tokens);
        }
    });
}
