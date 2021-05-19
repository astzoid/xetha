import { useContext } from 'react';
import { WebSocketContext } from '@auth/ws/WebSocketProvider';

export default function useUser() {
    const { user } = useContext(WebSocketContext);

    return user;
}
