import Manager from '../structures/Manager';
import { Guild } from '@shared/database';
import type { GuildAttributes } from '@shared/database';
import type { Disclosure } from 'disclosure-discord';

export default class GuildManager extends Manager<GuildAttributes> {
    public constructor(client: Disclosure) {
        super(client);
    }

    public async fetch(guild_id: string, name: string) {
        if (this.cache.has(guild_id)) {
            const guild = this.cache.get(guild_id);
            if (guild) {
                if (guild.name === name) return guild;
                guild.name = name;
                return guild;
            }
        }
        let guild = await Guild.findOne({ guild_id });
        if (!guild) guild = await Guild.create({ guild_id, name });
        if (guild.name !== name) guild.name = name;
        this.cache.set(guild_id, guild);
        return guild;
    }

    public async delete(guild_id: string) {
        this.cache.delete(guild_id);
        await this.client.managers.members.deleteAll(guild_id);
        return Guild.deleteMany({ guild_id });
    }
}
