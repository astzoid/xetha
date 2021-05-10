import { Disclosure, DiscordEvent } from 'disclosure-discord';
import Guild, { GuildAttributes } from '../database/models/Guild';

export default class extends DiscordEvent<'guildDataUpdate'> {
    public constructor(client: Disclosure) {
        super(client, 'guildDataUpdate');
    }

    public async exec(guild_id: string) {
        if (this.client.guilds.cache.has(guild_id)) {
            const guild = await Guild.findOne({
                guild_id,
            });

            this.client.managers.guilds.cache.set(
                guild_id,
                guild as GuildAttributes,
            );
        }
    }
}
