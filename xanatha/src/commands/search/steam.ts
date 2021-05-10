import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { Colors } from '../../utils/Constants';
import HumanReadable from '@oadpoaw/human-readable';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'steam',
            description: 'Searches a Game on Steam for your query',
            cooldown: 10,
            args: 1,
            usage: ['steam <query>'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message, argv: Arguments) {
        const query = argv._.join(' ');

        const id = await this.search(query);

        if (!id) return message.channel.send('Could not find any results.');

        const data = await this.fetchGame(id);
        const current = data.price_overview
            ? `$${data.price_overview.final / 100}`
            : 'Free';
        const original = data.price_overview
            ? `$${data.price_overview.initial / 100}`
            : 'Free';
        const price =
            current === original ? current : `~~${original}~~ ${current}`;

        const platforms = [];

        if (data.platforms) {
            if (data.platforms.windows) {
                platforms.push('Windows');
            }
            if (data.platforms.mac) {
                platforms.push('Mac');
            }
            if (data.platforms.linux) {
                platforms.push('Linux');
            }
        }

        return message.channel.send(
            new MessageEmbed()
                .setColor(Colors.navy)
                .setAuthor(
                    'Steam',
                    'https://i.imgur.com/xxr2UBZ.png',
                    'http://store.steampowered.com/',
                )
                .setTitle(data.name)
                .setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
                .setThumbnail(data.header_image)
                .addField('❯ Price', price, true)
                .addField(
                    '❯ Metascore',
                    data.metacritic ? data.metacritic.score : '???',
                    true,
                )
                .addField(
                    '❯ Recommendations',
                    data.recommendations
                        ? HumanReadable(data.recommendations.total)
                        : '???',
                    true,
                )
                .addField('❯ Platforms', platforms.join(', ') || 'None', true)
                .addField(
                    '❯ Release Date',
                    data.release_date ? data.release_date.date : '???',
                    true,
                )
                .addField(
                    '❯ DLC Count',
                    data.dlc ? HumanReadable(data.dlc.length) : 0,
                    true,
                )
                .addField(
                    '❯ Developers',
                    data.developers
                        ? data.developers.join(', ') || '???'
                        : '???',
                )
                .addField(
                    '❯ Publishers',
                    data.publishers
                        ? data.publishers.join(', ') || '???'
                        : '???',
                ),
        );
    }

    private async search(query: string) {
        const queries = `?cc=us&l=en&term=${encodeURIComponent(query)}`;

        const response = await fetch(
            `https://store.steampowered.com/api/storesearch${queries}`,
        );
        const body = await response.json();

        if (!body.items.length) return null;

        return body.items[0].id;
    }

    private async fetchGame(id: any) {
        const response = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}`,
        );
        const body = await response.json();

        return body[id.toString()].data;
    }
}
