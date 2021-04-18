import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { RateLimitData } from 'discord.js';

export default class extends DiscordEvent {
    constructor(client: Disclosure) {
        super(client, 'rateLimit');
    }

    async exec(rateLimit: RateLimitData) {
        this.client.logger.warn(rateLimit);
    }
}
