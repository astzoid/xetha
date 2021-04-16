import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import quotes from '../../assets/quotes';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'quote',
            description: 'Using A.I. this will send the right quote for you',
            cooldown: 3,
            args: 0,
            usage: ['quote'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {

        const index = quotes[Math.floor(Math.random() * quotes.length)];

        message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${index.quote}`)
                .setFooter(`- ${index.author}`)
        );

    }

}