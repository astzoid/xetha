import { getCommands } from '../../client';
import Logger from '../../utils/Logger';
import type DoneCallback from '../../utils/DoneCallback';

export default function commands(done: DoneCallback) {
    getCommands()
        .then((commands) => done(null, commands))
        .catch((err) => {
            Logger.error(`[ws] Error`, err);
            done(new Error(`Internal WebSocket Error`));
        });
}
