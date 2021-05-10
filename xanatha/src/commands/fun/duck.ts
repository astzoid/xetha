import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'duck',
            description: 'Sends an image of duck oink oink',
            cooldown: 5,
            args: 0,
            usage: ['duck'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const response = await fetch('https://random-d.uk/api/v1/random');
        const body = await response.json();

        await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setURL('https://random-d.uk/')
                .setImage(body.url)
                .setFooter(body.message),
        );
    }
}
