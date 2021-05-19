import type { Socket } from 'socket.io';
import type { DisclosureSharder } from 'disclosure-discord';
import type { Shard } from '@shared/types';
import type Acknowledge from '../Acknowledge';

export default function Status(manager: DisclosureSharder, socket: Socket) {
    socket.on('status', async (done: Acknowledge) => {
        if (typeof done !== 'function') return;
        try {
            const payload = (await manager.broadcastEval(
                `({ id: this.shard.id, guilds: this.guilds.cache.size, ping: this.ws.ping, uptime: this.uptime });`,
            )) as Array<Shard>;

            done(null, payload);
        } catch (err) {
            done(err);
        }
    });
}
