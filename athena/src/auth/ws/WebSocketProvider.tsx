import React, { createContext, useState, useEffect } from 'react';
import WebSocketClient from '@auth/ws/WebSocketClient';

import useQueryParams from '@hooks/useQueryParams';
import useSaveTokens from '@hooks/useSaveTokens';
import useTokenStore from '@hooks/useTokenStore';

import type { ReactNode } from 'react';

export const WebSocketContext = createContext<WebSocketClient | null>(null);

interface Props {
    fallback: ReactNode;
    children: ReactNode;
}

export default function WebSocketProvider(props: Props) {
    const [client, setClient] = useState<WebSocketClient | null>(null);
    const [serverDown, setServerDown] = useState(false);
    const query = useQueryParams();

    useSaveTokens();

    useEffect(() => {
        const connect =
            query.has('accessToken') && query.has('refreshToken')
                ? false
                : true;
        if (connect) {
            new WebSocketClient()
                .listen({
                    onToken: (tokens) => {
                        useTokenStore.getState().setTokens(tokens);
                    },
                    onConnectionFailed: () => {
                        setServerDown(true);
                    },
                })
                .connect(useTokenStore.getState())
                .then((ws) => {
                    setServerDown(false);
                    setClient(ws);
                });
        }
    }, []);

    if (!client) return null;

    if (serverDown) return <>{props.fallback}</>;

    return (
        <WebSocketContext.Provider value={client}>
            {props.children}
        </WebSocketContext.Provider>
    );
}
