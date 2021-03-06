import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/Constants';
import fetch from 'node-fetch';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'chunknorris',
            description: 'Sends a stupid joke that Chuck Norris said',
            cooldown: 5,
            args: 0,
            usage: ['chucknorris'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const response = await fetch(`https://api.chucknorris.io/jokes/random`);
        const body = await response.json();

        await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setThumbnail(body.icon_url)
                .setURL(body.url)
                .setDescription(body.value)
                .setTimestamp(new Date(body.created_at)),
        );
    }
}
