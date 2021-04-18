import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';
import fetch from 'node-fetch';
import Utils from '../../utils/Utils';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'stackexchange',
            description: 'Searches Stack Exchange for your query',
            cooldown: 10,
            args: 1,
            usage: ['stackexchange <query>'],
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
        const query = encodeURIComponent(args.join(' '));
        const queries = `?q=${query}&page=1&pagesize=1&order=asc&sort=relevance&answers=1&site=stackoverflow`;

        try {
            const response = await fetch(
                `http://api.stackexchange.com/2.2/search/advanced${queries}`,
            );
            const body = await response.json();

            if (!body.items.length) {
                return message.channel.send('Could not find any results.');
            }

            const data = body.items[0];

            message.channel.send(
                new MessageEmbed()
                    .setColor(Colors.silver)
                    .setAuthor(
                        'Stack Exchange',
                        'https://i.imgur.com/P2jAgE3.png',
                        'https://stackoverflow.com/',
                    )
                    .setURL(data.link)
                    .setTitle(data.title)
                    .addField('❯ ID', data.question_id, true)
                    .addField(
                        '❯ Asker',
                        `[${data.owner.display_name}](${data.owner.link})`,
                        true,
                    )
                    .addField(
                        '❯ Views',
                        Utils.toHumanReadable(data.view_count),
                        true,
                    )
                    .addField(
                        '❯ Score',
                        Utils.toHumanReadable(data.score),
                        true,
                    )
                    .addField(
                        '❯ Creation Date',
                        moment
                            .utc(data.creation_date * 1000)
                            .format('MM/DD/YYYY h:mm A'),
                        true,
                    )
                    .addField(
                        '❯ Last Activity',
                        moment
                            .utc(data.last_activity_date * 1000)
                            .format('MM/DD/YYYY h:mm A'),
                        true,
                    ),
            );
        } catch (err) {
            return message.channel.send(
                `Oh no, an error occurred: \`${err.message}\`. Try again later!`,
            );
        }
    }
}
