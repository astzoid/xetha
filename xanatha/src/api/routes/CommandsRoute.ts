import AsyncWrapper from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';
import { Router } from 'express';

interface Config {
    name: string;
    description: string;
    usage: string[];
    category: string;
    aliases: string[];
}

export default function Commands(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/',
        AsyncWrapper(async (_req, res) => {
            const shards = (await manager.broadcastEval(
                `this.commands
                .filter((command) => {
                    if (command.config.category) {
                        if (command.config.category === 'staff') {
                            return false;
                        }
                    }
                    if (command.config.ownerOnly) {
                        return false;
                    }
                    return true;
                })
                .map((command) => { 
                    return { 
                        name: command.config.name,
                        description: command.config.description,
                        usage: command.config.usage,
                        category: command.config.category,
                        aliases: command.config.aliases
                    }
                });`,
                0,
            )) as Array<Config>;

            res.status(200).json(shards);
        }),
    );

    return route;
}
