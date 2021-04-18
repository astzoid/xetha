import { config } from 'dotenv';
config();

import './database/database';

import { DisclosureSharder } from 'disclosure-discord';
import server from './api/server';
import Logger from './utils/Logger';
import processor from '@xetha/processor';

processor(Logger);

const manager = new DisclosureSharder(
    {
        totalShards: 'auto',
        respawn: true,
        execArgv: ['--trace-warnings'],
    },
    Logger,
);

(async function () {
    await manager.initialize().spawn();

    server(manager);
})();
