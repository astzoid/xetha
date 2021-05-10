import { Disclosure, DiscordEvent } from 'disclosure-discord';
import {
    BlacklistedServer,
    BlacklistedUser,
} from '../database/models/Blacklisted';
import type { BlacklistedAttributes } from '../database/models/Blacklisted';

export default class extends DiscordEvent<'blacklist'> {
    public constructor(client: Disclosure) {
        super(client, 'blacklist');
    }

    public async exec(data: ['server' | 'user', string]) {
        if (data[0] === 'server') {
            this.client.managers.blacklist.cache.get('server')?.set(
                data[1],
                (await BlacklistedServer.findOne({
                    target_id: data[1],
                })) as BlacklistedAttributes,
            );
        } else if (data[0] === 'user') {
            this.client.managers.blacklist.cache.get('user')?.set(
                data[1],
                (await BlacklistedUser.findOne({
                    target_id: data[1],
                })) as BlacklistedAttributes,
            );
        }
    }
}
