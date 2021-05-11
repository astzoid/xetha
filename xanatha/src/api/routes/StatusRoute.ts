import { Router } from 'express';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';
import type { Shard } from '@shared/types';

export default function Status(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/',
        AsyncWrapper(async (_req, res) => {
            const payload = (await manager.broadcastEval(
                `({ id: this.shard.id, guilds: this.guilds.cache.size, ping: this.ws.ping, uptime: this.uptime });`,
            )) as Array<Shard>;
            res.status(200).json(payload);
        }),
    );

    return route;
}
