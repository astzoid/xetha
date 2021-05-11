import '@shared/env';
import '@shared/database';

import { DisclosureSharder } from 'disclosure-discord';
import server from './api/server';
import Logger from './utils/Logger';
import processor from '@oadpoaw/processor';

processor(Logger);

const manager = new DisclosureSharder(
    {
        totalShards: 'auto',
        respawn: true,
        execArgv: ['--trace-warnings'],
    },
    Logger,
);

(async function Start() {
    await manager.initialize().spawn();
    server(manager);
})().catch((err) => {
    Logger.error(err);
    process.exit(1);
});
