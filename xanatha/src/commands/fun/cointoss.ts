import { Disclosure, Command } from 'disclosure-discord';
import type { Message } from 'discord.js';

const answers = ['🤴 Heads!', '🐛 Tails!'];

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'cointoss',
            description: 'Toss a coin',
            cooldown: 3,
            args: 0,
            usage: ['cointoss'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        await message.channel.send(
            answers[Math.floor(Math.random() * answers.length)],
        );
    }
}
