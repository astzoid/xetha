import { Disclosure, Command } from 'disclosure-discord';
import type { Message } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'yes',
            description: 'no',
            cooldown: 3,
            args: 0,
            usage: ['yes'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        await message.reply('No!');
    }
}
