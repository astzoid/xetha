import { getStatus } from '../../client';
import Logger from '../../utils/Logger';
import type DoneCallback from '../../utils/DoneCallback';

export default function status(done: DoneCallback) {
    getStatus()
        .then((shards) => done(null, shards))
        .catch((err) => {
            Logger.error(`[ws] Error`, err);
            done(new Error(`Internal WebSocket Error`));
        });
}
