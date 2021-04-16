import { Disclosure, DiscordEvent } from 'disclosure-discord';

export default class extends DiscordEvent {

    constructor(client: Disclosure) {
        super(client, 'warn');
    }

    async exec(warning: string) {
        this.client.logger.warn(warning);
    }

}