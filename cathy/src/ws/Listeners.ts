import Logger from '../utils/Logger';
import type { Socket } from 'socket.io';

export default function Listeners(socket: Socket) {
    socket.on('message', (message: string) => {
        if (typeof message === 'string')
            Logger.info(`[client] ${socket.id}: ${message}`);
    });

    socket.on('error', (error: Error) => {
        Logger.error(error);
    });

    socket.on('disconnect', (reason: string) => {
        Logger.info(`[client] ${socket.id} disconnected: ${reason}`);
    });

    socket.on('disconnecting', (reason: string) => {
        Logger.info(`[client] ${socket.id} disconnecting: ${reason}`);
    });
}
