import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'mdn',
            description: 'Searches MDN (JavaScript Documentation) for your query.',
            cooldown: 10,
            args: 1,
            usage: ['mdn <query>'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {

        const args = argv._;

        const query = encodeURIComponent(args[0].replace(/#/g, '.prototype.'));
        const response = await fetch(`https://developer.mozilla.org/en-US/search.json?q=${query}&locale=en-US&highlight=false`);
        const body = await response.json();

        if (!body.documents.length) {
            return message.channel.send('Could not find any results.');
        }

        const data = body.documents[0];

        message.channel.send(
            new MessageEmbed()
                .setColor(Colors.blue)
                .setAuthor('MDN', 'https://i.imgur.com/DFGXabG.png', 'https://developer.mozilla.org/')
                .setURL(data.url)
                .setTitle(data.title)
                .setDescription(data.excerpt)
        );
    }

}