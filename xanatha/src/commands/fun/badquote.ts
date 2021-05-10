import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/Constants';
import fetch from 'node-fetch';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'badquote',
            description: 'This gives you a bad quote to degrade your morals',
            cooldown: 5,
            args: 0,
            usage: ['badquote'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const response = await fetch(
            `https://breaking-bad-quotes.herokuapp.com/v1/quotes`,
        );
        const body = await response.json();

        await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setURL('https://breaking-bad-quotes.herokuapp.com/')
                .setDescription(`${body[0].quote}`)
                .setFooter(`- ${body[0].author}`),
        );
    }
}
