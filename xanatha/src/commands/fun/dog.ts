import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'dog',
            description: 'Sends a random image of a puppy dog',
            cooldown: 5,
            args: 0,
            usage: ['dog'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const body = await response.json();

        await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setURL('https://dog.ceo/')
                .setImage(body.message),
        );
    }
}
