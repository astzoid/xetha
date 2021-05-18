import type { Socket } from 'socket.io';
import type { DisclosureSharder } from 'disclosure-discord';
import type { Command } from '@shared/types';
import type Acknowledge from '../Acknowledge';

export default function Commands(manager: DisclosureSharder, socket: Socket) {
    socket.on('commands', async (done: Acknowledge) => {
        try {
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
            done(null, shards);
        } catch (err) {
            done(err);
        }
    });
}
