import { Disclosure, DiscordEvent } from 'disclosure-discord';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'error');
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    public async exec(error: Error) {
        this.client.logger.error(error);
    }
}
