import { useContext } from 'react';
import { WebSocketContext } from '@auth/ws/WebSocketProvider';
import type WebSocketClient from '@auth/ws/WebSocketClient';

export default function useClient() {
    const { client } = useContext(WebSocketContext);

    return <WebSocketClient>client;
}
