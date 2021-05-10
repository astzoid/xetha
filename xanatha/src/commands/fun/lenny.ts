import { Disclosure, Command } from 'disclosure-discord';
import type { Message } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
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

    public async execute(message: Message) {
        await message.reply('( ͡° ͜ʖ ͡°)');
    }
}
