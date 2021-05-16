import type { Socket } from 'socket.io';
import type { UserAttributes } from '@shared/database';
import type DoneCallback from '../utils/DoneCallback';

type Acknowledge = (
    socket: Socket,
    user: UserAttributes | null,
    query: any,
    cb: DoneCallback,
) => any;

export default class Route {
    public constructor(public path: string, public ack: Acknowledge) {}
}
