import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'fox',
            description: 'What does the fox says? ning ning ning ning',
            cooldown: 5,
            args: 0,
            usage: ['fox'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const response = await fetch('https://randomfox.ca/floof/');
        const { image } = await response.json();

        await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setURL('https://randomfox.ca/')
                .setImage(image),
        );
    }
}
