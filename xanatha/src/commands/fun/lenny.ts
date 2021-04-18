import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'lenny',
            description: '( ͡° ͜ʖ ͡°)',
            cooldown: 3,
            args: 0,
            usage: ['lenny'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        message.reply('( ͡° ͜ʖ ͡°)');
    }
}
