import { Disclosure, Command } from 'disclosure-discord';
import type { Message } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'no',
            description: 'yes!',
            cooldown: 3,
            args: 0,
            usage: ['no'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        await message.reply('yes!');
    }
}
