import guild from './guild';
import guildUpdate from './guildUpdate';
import type { UserAttributes } from '@shared/database';
import type DoneCallback from '../../utils/DoneCallback';

export default function ProtectedRoutes(
    user: UserAttributes,
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
        case 'guild':
            return guild(user, query.guild_id, done);
        case 'guildUpdate':
            return guildUpdate(user, query.guild_id, query.data, done);
        default:
            return done(new Error(`'path' not found`));
    }
}
