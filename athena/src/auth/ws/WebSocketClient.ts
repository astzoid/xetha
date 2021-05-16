import io, { Socket } from 'socket.io-client';
import environment from '@auth/environment';
import Logger from '@functions/Logger';

export default class WebSocketClient {
    public socket: typeof Socket;

    public constructor() {
        this.socket = io(environment.ws, {
            transports: ['websocket'],
            upgrade: environment.production,
            secure: environment.production,
            autoConnect: false,
        });

        this.socket.on('message', (message: string) => {
            Logger.log('SERVER', message);
        });

        this.socket.on('ping', () => {
            Logger.log('WS', 'Ping received.');
        });

        this.socket.on('reconnect', (attempts: number) => {
            Logger.log(
                'WS',
                `[FAST RECONNECT] ${this.socket.io.uri} ${attempts}`,
            );
        });

        this.socket.on('reconnect_attempt', (attempts: number) => {
            Logger.log(
                'WS',
                `[FAST RECONNECT ATTEMPT] ${this.socket.io.uri} ${attempts}`,
            );
        });

        this.socket.on('auth:error', (error: Error, code: number) => {
            Logger.error(`[WS] [AUTH] ${code}`, error);
            if (code === 400) window.location.reload();
        });

        this.socket.on('error', (error: Error) => {
            Logger.error('[WS]', error);
        });

        this.socket.on('disconnect', (reason: string) => {
            Logger.warn('[WS] [DISCONNECT]', reason);
        });

        this.socket.on('reconnect_error', (error: Error) => {
            Logger.error(`[WS] [RECONNECT]`, error);
        });
    }

    public request<T = any>(path: string, query: any): Promise<T> {
        return this._request(path, query);
    }

    private _request(_path: string, _query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                // TODO
                // Some cool websocket bidirectional requesting to the websocket
                resolve(0);
            } catch (err) {
                reject(err);
            }
        });
    }
}
