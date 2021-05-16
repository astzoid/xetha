import React, { createContext, useState, useEffect } from 'react';
import WebSocketClient from '@auth/ws/WebSocketClient';

import Logger from '@functions/Logger';

import useQueryParams from '@hooks/useQueryParams';
import useSaveTokens from '@hooks/useSaveTokens';
import useTokenStore from '@hooks/useTokenStore';

import type Tokens from '@typings/Tokens';
import type User from '@typings/User';

interface Context {
    client: WebSocketClient | null;
    user: User | null;
    loading: boolean;
}

export const WebSocketContext = createContext<Context>({
    client: null,
    user: null,
    loading: true,
});

const WebSocketProvider: React.FC = (props) => {
    const [client, setClient] = useState<WebSocketClient | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const query = useQueryParams();

    useSaveTokens();

    useEffect(() => {
        const connect =
            query.has('accessToken') && query.has('refreshToken')
                ? false
                : true;

        if (connect) {
            const ws = new WebSocketClient();

            ws.socket.on('connect', () => {
                Logger.log('WS', `[CONNECTED] ${ws.socket.id}`);
                ws.socket.emit('auth', useTokenStore.getState());
            });

            ws.socket.on('auth:success', (user: User | null) => {
                if (user) Logger.log('WS', `Logged in as ${user.user_id}`);
                setUser(user || null);
                setLoading(false);
            });

            ws.socket.on('auth:token', (tokens: Tokens) => {
                useTokenStore.getState().setTokens(tokens);
            });

            ws.socket.connect();

            setClient(ws);
        }
    }, []);

    if (!client) return null;

    return (
        <WebSocketContext.Provider value={{ client, user, loading }}>
            {props.children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
