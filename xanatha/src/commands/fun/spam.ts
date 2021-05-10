import { Disclosure, Command } from 'disclosure-discord';
import type { Message } from 'discord.js';
import path from 'path';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'spam',
            description: 'Spammy spam spam SPAM image',
            cooldown: 3,
            args: 0,
            usage: ['spam'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        await message.channel.send({
            files: [
                path.join(path.resolve(process.cwd()), 'assets', 'spam.png'),
            ],
        });
    }
}
