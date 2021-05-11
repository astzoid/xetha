import Manager from '../structures/Manager';
import { Collection, User } from 'discord.js';
import { BlacklistedServer, BlacklistedUser } from '@shared/database';
import type { Disclosure } from 'disclosure-discord';
import type { BlacklistedAttributes } from '@shared/database';

export default class BlacklistManager extends Manager<
    Collection<string, BlacklistedAttributes>
> {
    public constructor(client: Disclosure) {
        super(client);
        this.cache.set('server', new Collection());
        this.cache.set('user', new Collection());
    }

    public async synchronize() {
        const servers = await BlacklistedServer.find({});
        const users = await BlacklistedUser.find({});
        const s = this.cache.get('server');
        const u = this.cache.get('user');
        if (s) {
            s.clear();
            for (const server of servers) s.set(server.target_id, server);
        }
        if (u) {
            u.clear();
            for (const user of users) u.set(user.target_id, user);
        }
    }

    public getServer(guild_id: string): BlacklistedAttributes | undefined {
        return this.cache.get('server')?.get(guild_id);
    }

    public getUser(user_id: string): BlacklistedAttributes | undefined {
        return this.cache.get('user')?.get(user_id);
    }

    public async server(guild_id: string, moderator: User, reason: string) {
        const server = await BlacklistedServer.create({
            target_id: guild_id,
            reason: reason.length ? reason : 'No reason provided.',
            moderator: `${moderator.tag} / ${moderator.id}`,
        });
        this.broadcast('server', server.target_id);
        return server;
    }

    public async user(user_id: string, moderator: User, reason: string) {
        const user = await BlacklistedUser.create({
            target_id: user_id,
            reason: reason.length ? reason : 'No reason provided.',
            moderator: `${moderator.tag} / ${moderator.id}`,
        });
        this.broadcast('user', user.target_id);
        return user;
    }

    private broadcast(type: 'server' | 'user', target_id: string) {
        this.client.shard?.broadcastEval(
            `this.emit('blacklist', ['${type}', '${target_id}'])`,
        );
    }
}
