import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';
import fetch from 'node-fetch';
import Utils from '../../utils/Utils';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'npm',
            description:
                'Sends or Shows the information of a Public NPM (Node Package Manager) Package',
            cooldown: 10,
            args: 1,
            usage: ['npm <package>'],
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
        const pkg = encodeURIComponent(args.join(' ').replace(/ +/g, '-'));

        try {
            const response = await fetch(`https://registry.npmjs.com/${pkg}`);
            const body = await response.json();

            if (response.status === 404 || body.time.unpublished) {
                return message.channel.send('This package no longer exists.');
            }

            const version = body.versions[body['dist-tags'].latest];
            const maintainers = Utils.trimArray(
                body.maintainers.map((user: any) => user.name),
            );
            const dependencies = version.dependencies
                ? Utils.trimArray(Object.keys(version.dependencies))
                : null;

            return message.channel.send(
                new MessageEmbed()
                    .setColor(Colors.maroon)
                    .setAuthor(
                        'NPM',
                        'https://i.imgur.com/ErKf5Y0.png',
                        'https://www.npmjs.com/',
                    )
                    .setTitle(body.name)
                    .setURL(`https://www.npmjs.com/package/${pkg}`)
                    .setDescription(body.description || 'No description.')
                    .addField('❯ Version', body['dist-tags'].latest, true)
                    .addField('❯ License', body.license || 'None', true)
                    .addField(
                        '❯ Author',
                        body.author ? body.author.name : '???',
                        true,
                    )
                    .addField(
                        '❯ Creation Date',
                        moment
                            .utc(body.time.created)
                            .format('MM/DD/YYYY h:mm A'),
                        true,
                    )
                    .addField(
                        '❯ Modification Date',
                        moment
                            .utc(body.time.modified)
                            .format('MM/DD/YYYY h:mm A'),
                        true,
                    )
                    .addField('❯ Main File', version.main || 'index.js', true)
                    .addField(
                        '❯ Dependencies',
                        dependencies && dependencies.length
                            ? dependencies.join(', ')
                            : 'None',
                    )
                    .addField('❯ Maintainers', maintainers.join(', ')),
            );
        } catch (err) {
            if (err.status === 404) {
                return message.channel.send('Could not find any results.');
            }

            return message.channel.send(
                `Oh no, an error occurred: \`${err.message}\`. Try again later!`,
            );
        }
    }
}
