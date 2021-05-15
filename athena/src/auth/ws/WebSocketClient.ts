import io, { Socket } from 'socket.io-client';
import environment from '@auth/environment';
import Logger from '@functions/Logger';
import type Tokens from '@typings/Tokens';
import type User from '@typings/User';

export default class WebSocketClient {
    private socket: typeof Socket;

    public constructor() {
        this.socket = io(environment.ws, {
            transports: ['websocket'],
            upgrade: environment.production,
            secure: environment.production,
            autoConnect: false,
            reconnection: false,
        });
    }

    public listen(fns: {
        onUser: (user: User | null) => void;
        onToken: (tokens: Tokens) => void;
        onConnectionFailed: () => void;
    }) {
        this.socket.on('auth:success', (user: User | null) => {
            Logger.log(
                'WS',
                `[CONNECTED] ${this.socket.id} ${user ? user.user_id : ''}`,
            );
            fns.onUser(user || null);
        });

        this.socket.on('auth:token', fns.onToken);

        this.socket.on('auth:error', (error: Error, code: number) => {
            Logger.error(`[WS] [AUTH] ${code}`, error);
            if (code === 400) window.location.reload();
        });

        this.socket.on('error', (error: Error) => {
            Logger.error('[WS]', error);
            fns.onConnectionFailed();
        });

        this.socket.on('connect_error', (error: Error) => {
            Logger.error('[WS] [CONNECT]', error);
            fns.onConnectionFailed();
        });

        this.socket.on('disconnect', (reason: string) => {
            Logger.warn('[WS] [DISCONNECT]', reason);
            fns.onConnectionFailed();
        });

        return this;
    }

    public connect(tokens: { accessToken: string; refreshToken: string }) {
        return new Promise<this>((resolve, reject) => {
            try {
                Logger.log('WS', `[FAST CONNECT] ${this.socket.io.uri}`);
                const fn = () => {
                    Logger.log('WS', `[CONNECTED] ${this.socket.io.uri}`);
                    this.socket.emit('auth', tokens);
                    this.socket.removeListener('connect', fn);
                    resolve(this);
                };

                this.socket.on('connect', fn);
                this.socket.connect();
            } catch (err) {
                Logger.error('[WS]', err);
                reject(err);
            }
        });
    }
}
