import io from 'socket.io-client';
import type { DisclosureSharder } from 'disclosure-discord';

export default function Server(manager: DisclosureSharder) {
    const client = io(
        process.env.WEBSOCKET_URI ?? 'ws://localhost:3001/xetha',
        {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        authorization: process.env.WEBSOCKET_SECRET ?? '123',
                    },
                },
            },
        },
    );
    manager;
    client;
}
