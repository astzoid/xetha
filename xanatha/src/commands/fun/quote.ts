import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import quotes from '../../assets/quotes';

export default class extends Command {
    public constructor(client: Disclosure) {
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

    public async execute(message: Message) {
        const index = quotes[Math.floor(Math.random() * quotes.length)];

        await message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`${index.quote}`)
                .setFooter(`- ${index.author}`),
        );
    }
}
