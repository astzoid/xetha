import Random from '@xetha/random';
import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';

export default class extends Command {
    constructor(client: Disclosure) {
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

    async execute(message: Message, argv: Arguments) {

        const stat = Random.number(101, 0);
        const target = message.mentions.users.first() || message.author;

        message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`Gay Rate 3000 go brrr`)
                .setDescription(`${target.username} is ${stat}% gay :rainbow_flag: `)
        );

    }

}