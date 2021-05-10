import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/Constants';
import fetch from 'node-fetch';

const url = [
    'https://www.reddit.com/r/dankmemes/hot/.json?limit=100',
    'https://www.reddit.com/r/memes/hot/.json?limit=100',
];

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'meme',
            description: 'Sends a random meme from reddit',
            cooldown: 5,
            args: 0,
            usage: ['meme'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: true,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const response = await fetch(
            url[Math.floor(Math.random() * url.length)],
        );
        const body = await response.json();

        const index =
            body.data.children[Math.floor(Math.random() * 99) + 1].data;
        const { title } = index;

        if (index.post_hint !== 'image') {
            return message.channel.send(
                new MessageEmbed()
                    .setAuthor('r/dankmemes or r/memes')
                    .setColor(Colors.random)
                    .setDescription(
                        `[${title}](${this.client.xetha.support.invite})`,
                    ),
            );
        }

        const image = index.url;

        return message.channel.send(
            new MessageEmbed()
                .setAuthor('r/dankmemes or r/memes')
                .setImage(image)
                .setColor(Colors.random)
                .setDescription(
                    `[${title}](${this.client.xetha.support.invite})`,
                ),
        );
    }
}
