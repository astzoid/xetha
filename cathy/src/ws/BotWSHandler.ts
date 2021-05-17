import Logger from '../utils/Logger';
import type { Socket } from 'socket.io';

function getWSSecret() {
    return process.env.WEBSOCKET_SECRET ?? '123';
}

export default function BotWSHandler(socket: Socket) {
    const { headers } = socket.handshake;
    if (
        typeof headers.authorization !== 'string' &&
        headers.authorization !== getWSSecret()
    ) {
        Logger.info(`[bot] ${socket.id} tried to connect.`);
        socket.disconnect();
    } else {
        Logger.info(`[bot] ${socket.id} connected.`);
        // We can now access this everywhere
        globalThis.BotWSClient = socket;
    }
}
