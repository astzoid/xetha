import { Disclosure, DiscordEvent } from 'disclosure-discord';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'warn');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async exec(warning: string) {
        this.client.logger.warn(warning);
    }
}
