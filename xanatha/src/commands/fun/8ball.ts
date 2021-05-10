import { Disclosure, Command, Arguments } from 'disclosure-discord';
import type { Message } from 'discord.js';

const answers = [
    'yes',
    'no',
    'maybe',
    'sort of',
    "can't tell",
    'ofc not',
    'probably',
    'yes but no',
    'no but yes',
    'yep',
    'nope',
    "i don't think so",
    'well yes but actually no',
    'well no but actually yes',
    'omg yes!',
    'nooooo',
];

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: '8ball',
            description: 'The 8ball command to answer you lame questions',
            cooldown: 3,
            args: 0,
            usage: ['8ball [question]'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message, _argv: Arguments) {
        await message.channel.send(
            answers[Math.floor(Math.random() * answers.length)],
        );
    }
}
