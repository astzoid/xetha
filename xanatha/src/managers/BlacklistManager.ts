import Manager from '../structures/Manager';
import {
    BlacklistedServer,
    BlacklistedUser,
    BlacklistedAttributes,
} from '../database/models/Blacklisted';
import { Collection, User } from 'discord.js';
import { Disclosure } from 'disclosure-discord';

export default class BlacklistManager extends Manager<
    Collection<string, BlacklistedAttributes>
> {
    constructor(client: Disclosure) {
        super(client);

        this.cache.set('server', new Collection());
        this.cache.set('user', new Collection());
    }

    async synchronize() {
        const servers = await BlacklistedServer.find({});
        const users = await BlacklistedUser.find({});

        this.cache.get('server').clear();
        this.cache.get('user').clear();

        for (const server of servers) {
            this.cache.get('server').set(server.target_id, server);
        }

        for (const user of users) {
            this.cache.get('user').set(user.target_id, user);
        }
    }

    getServer(guild_id: string): BlacklistedAttributes | undefined {
        return this.cache.get('server').get(guild_id);
    }

    getUser(user_id: string): BlacklistedAttributes | undefined {
        return this.cache.get('user').get(user_id);
    }

    private broadcast(type: 'server' | 'user', target_id: string) {
        this.client.shard.broadcastEval(
            `this.emit('blacklist', ['${type}', '${target_id}'])`,
        );
    }

    async server(guild_id: string, moderator: User, reason: string) {
        const server = await BlacklistedServer.create({
            target_id: guild_id,
            reason: reason.length ? reason : 'No reason provided.',
            moderator: `${moderator.tag} / ${moderator.id}`,
        });

        this.broadcast('server', server.target_id);

        return server;
    }

    async user(user_id: string, moderator: User, reason: string) {
        const user = await BlacklistedUser.create({
            target_id: user_id,
            reason: reason.length ? reason : 'No reason provided.',
            moderator: `${moderator.tag} / ${moderator.id}`,
        });

        this.broadcast('user', user.target_id);

        return user;
    }
}
