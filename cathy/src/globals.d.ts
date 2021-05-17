import type { Socket } from 'socket.io';

declare global {
    // eslint-disable-next-line no-var
    var BotWSClient: Socket | null;
}
