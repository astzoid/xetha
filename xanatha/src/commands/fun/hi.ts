import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'hi',
            description: 'hello!',
            cooldown: 3,
            args: 0,
            usage: ['hi'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        message.reply('hi!');
    }
}
