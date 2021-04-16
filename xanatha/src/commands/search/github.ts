import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';
import fetch from 'node-fetch';
import Utils from '../../utils/Utils';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'github',
            description: 'Shows information about a Public Github Repository',
            cooldown: 10,
            args: 2,
            usage: ['github <owner|organization> <repository>'],
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
        const author = args.shift();
        const repository = args.shift();

        try {

            const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(author)}/${encodeURIComponent(repository)}`).catch(e => { throw e; });
            const body = await response.json();

            if (body.message && body.message === 'Not Found') {

                throw { status: 404 };

            }

            message.channel.send(
                new MessageEmbed()
                    .setColor(Colors.white)
                    .setAuthor('GitHub', 'https://i.imgur.com/e4HunUm.png', 'https://github.com/')
                    .setTitle(body.full_name)
                    .setURL(body.html_url)
                    .setDescription(body.description ? Utils.shorten(body.description) : 'No description.')
                    .setThumbnail(body.owner ? (body.owner.avatar_url ? body.owner.avatar_url : null) :
                        (body.organization ? (body.organization.avatar_url ? body.organization.avatar_url : null) : null))
                    .addField('❯ Stars', Utils.toHumanReadable(body.stargazers_count), true)
                    .addField('❯ Forks', Utils.toHumanReadable(body.forks), true)
                    .addField('❯ Issues', Utils.toHumanReadable(body.open_issues), true)
                    .addField('❯ Language', body.language || '???', true)
                    .addField('❯ Creation Date', moment.utc(body.created_at).format('MM/DD/YYYY h:mm A'), true)
                    .addField('❯ Modification Date', moment.utc(body.updated_at).format('MM/DD/YYYY h:mm A'), true)
            );

        } catch (err) {
            if (err.status && err.status === 404) {
                return message.channel.send('Could not find any results.');
            }

            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);

        }
    }

}