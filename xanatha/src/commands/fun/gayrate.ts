import { Disclosure, Command } from 'disclosure-discord';
import Random from '@oadpoaw/random';
import { Message, MessageEmbed } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'gayrate',
            description: 'Calculates your gayness',
            cooldown: 3,
            args: 0,
            usage: ['gayrate'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const stat = Random.number(101, 0);
        const target = message.mentions.users.first() ?? message.author;

        await message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`Gay Rate 3000 go brrr`)
                .setDescription(
                    `${target.username} is ${stat}% gay :rainbow_flag: `,
                ),
        );
    }
}
