import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'cat',
            description: 'Sends a random image of a cat cat cat!',
            cooldown: 5,
            args: 0,
            usage: ['cat'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const response = await fetch('http://placekitten.com/200/300');
        const body = await response.json();

        message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setImage(body)
                .setURL('http://placekitten.com/')
                .setFooter('http://placekitten.com/'),
        );
    }
}
