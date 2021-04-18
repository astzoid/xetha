import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'advice',
            description: 'The command that gives you life advices',
            cooldown: 5,
            args: 0,
            usage: ['advice'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const response = await fetch(`https://api.adviceslip.com/advice`);
        const body = await response.json();

        message.channel.send(
            new MessageEmbed()
                .setDescription(body.slip.advice)
                .setURL('https://adviceslip.com'),
        );
    }
}
