import { useContext } from 'react';
import { WebSocketContext } from '@auth/ws/WebSocketProvider';

export default function useLoading() {
    const { loading } = useContext(WebSocketContext);

    return loading;
}
