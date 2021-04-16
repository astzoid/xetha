import { Disclosure, DiscordEvent } from 'disclosure-discord';
import Guild from '../database/models/Guild';

export default class extends DiscordEvent<'guildDataUpdate'> {

    constructor(client: Disclosure) {
        super(client, 'guildDataUpdate');
    }

    async exec(guild_id: string) {
        if (this.client.guilds.cache.has(guild_id)) {

            const guild = await Guild.findOne({ guild_id });

            this.client.managers.guilds.cache.set(guild_id, guild);

        }
    }

}