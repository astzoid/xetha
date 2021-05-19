import commands from './commands';
import status from './status';
import type DoneCallback from '../../utils/DoneCallback';

export default function PublicRoutes(
    path: string,
    query: Record<string, any>,
    done: DoneCallback,
) {
    if (typeof path !== 'string')
        return done(new Error(`'path' should be a string`));
    if (typeof query !== 'object' || Array.isArray(query))
        return done(new Error(`'query' should be an object`));
    if (typeof done !== 'function') return false;

    switch (path) {
        case 'commands':
            return commands(done);
        case 'status':
            return status(done);
        default:
            return done(new Error(`'path' not found`));
    }
}
