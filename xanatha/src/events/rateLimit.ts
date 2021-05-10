import { Disclosure, DiscordEvent } from 'disclosure-discord';
import type { RateLimitData } from 'discord.js';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'rateLimit');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async exec(rateLimit: RateLimitData) {
        this.client.logger.warn(rateLimit);
    }
}
