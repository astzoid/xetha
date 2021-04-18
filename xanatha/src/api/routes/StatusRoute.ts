import { Router } from 'express';
import { version } from '../../utils/Constants';
import AsyncWrapper from '@xetha/async-wrapper';
import { DisclosureSharder } from 'disclosure-discord';

export default function Status(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/',
        AsyncWrapper(async (_req, res) => {
            const shards = (await manager.broadcastEval(
                `const info = { id: this.shard.id, guilds: this.guilds.cache.size, ping: this.ws.ping, uptime: this.uptime }; info;`,
            )) as Array<{
                id: number;
                guilds: number;
                ping: number;
                uptime: number;
            }>;
            res.status(200).json({
                version,
                uptime: process.uptime(),
                guilds: await manager.getCount('guilds'),
                shards,
            });
        }),
    );

    return route;
}
