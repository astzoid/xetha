import AsyncWrapper from '@oadpoaw/async-wrapper';
import { Router } from 'express';
import type { DisclosureSharder } from 'disclosure-discord';
import type { Command } from '@shared/types';

export default function Commands(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/',
        AsyncWrapper(async (_req, res) => {
            const shards = (await manager.broadcastEval(
                `this.commands
                .filter((command) => {
                    if (command.config.category && command.config.category === 'staff') {
                        return false;
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
            )) as Array<Command>;

            res.status(200).json(shards);
        }),
    );

    return route;
}
