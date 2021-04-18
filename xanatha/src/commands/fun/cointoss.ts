import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';

const answers = ['🤴 Heads!', '🐛 Tails!'];

export default class extends Command {
    constructor(client: Disclosure) {
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

    async execute(message: Message, argv: Arguments) {
        message.channel.send(
            answers[Math.floor(Math.random() * answers.length)],
        );
    }
}
