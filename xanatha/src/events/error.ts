import { Disclosure, DiscordEvent } from 'disclosure-discord';

export default class extends DiscordEvent {
    constructor(client: Disclosure) {
        super(client, 'error');
    }

    async exec(error: Error) {
        this.client.logger.error(error);
    }
}
