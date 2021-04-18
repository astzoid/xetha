import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';
import path from 'path';

export default class extends Command {
    constructor(client: Disclosure) {
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

    async execute(message: Message, argv: Arguments) {
        message.channel.send({
            files: [
                path.join(path.resolve(process.cwd()), 'assets', 'spam.png'),
            ],
        });
    }
}
