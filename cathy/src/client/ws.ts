import io from 'socket.io-client';
import Logger from '../utils/Logger';

function getWSSecret() {
    return process.env.WEBSOCKET_SECRET ?? '123';
}

const socket = io(process.env.WEBSOCKET_SERVER ?? 'ws://localhost:3002', {
    transports: ['websocket'],
    autoConnect: false,
    query: {
        key: getWSSecret(),
    },
});

socket.on('message', (message: string) => {
    Logger.info(`[xanatha] ${message}`);
});

socket.on('ping', () => {
    Logger.info('[ws] Ping received.');
});

socket.on('reconnect', (attempts: number) => {
    Logger.info(`[ws] [FAST RECONNECT] ${socket.io.uri} ${attempts}`);
});

socket.on('reconnect_attempt', (attempts: number) => {
    Logger.info(`[ws] [FAST RECONNECT ATTEMPT] ${socket.io.uri} ${attempts}`);
});

socket.on('error', (error: Error) => {
    Logger.error('[ws]', error);
});

socket.on('disconnect', (reason: string) => {
    Logger.warn('[ws] [DISCONNECT]', reason);
});

socket.on('reconnect_error', (error: Error) => {
    Logger.error(`[ws] [RECONNECT]`, error);
});

socket.connect();

export default socket;
