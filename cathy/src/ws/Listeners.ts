import Logger from '../utils/Logger';
import type { Socket } from 'socket.io';
import PublicRoutes from '../routes/public';

export default function Listeners(socket: Socket) {
    socket.on('message', (message: string) => {
        if (typeof message === 'string')
            Logger.log(`athena`, `${socket.id}: ${message}`);
    });

    socket.on('ping', () => {
        Logger.log(`athena`, `Ping received.`);
    });

    socket.on('request:public', PublicRoutes);

    socket.on('error', (error: Error) => {
        Logger.error(`[athena] ${socket.id}:`, error);
    });

    socket.on('disconnect', (reason: string) => {
        Logger.log(`athena`, `${socket.id} disconnected: ${reason}`);
    });

    socket.on('disconnecting', (reason: string) => {
        Logger.log(`athena`, `${socket.id} disconnecting: ${reason}`);
    });
}
