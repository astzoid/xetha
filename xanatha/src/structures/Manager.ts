import { Collection } from 'discord.js';
import { Disclosure } from 'disclosure-discord';

export default abstract class Manager<Holds = any> {
    constructor(protected client: Disclosure) {
        this.cache = new Collection();
    }

    cache: Collection<string, Holds>;
}
