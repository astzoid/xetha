import { Collection } from 'discord.js';
import type { Disclosure } from 'disclosure-discord';

export default abstract class Manager<Holds = any> {
    public cache: Collection<string, Holds>;

    public constructor(protected client: Disclosure) {
        this.cache = new Collection();
    }
}
