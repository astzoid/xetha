import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';

const slaps = [
    'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
    'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
    'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
    'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
    'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
    'https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif',
    'https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif',
    'https://media1.tenor.com/images/8b80166ce48c9c198951361715a90696/tenor.gif',
    'https://media1.tenor.com/images/6aa432caad8e3272d21a68ead3629853/tenor.gif',
    'https://media1.tenor.com/images/4ec47d7b87a9ce093642fc8a3c2969e7/tenor.gif'
];

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'slap',
            description: 'Slappy slap slap slap',
            cooldown: 5,
            args: 0,
            usage: ['slap <user>'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {

        const user = message.mentions.users.first();

        if (!user) {
            return message.channel.send('Oh oh... you gotta need to mention a user to slap :/');
        }

        return message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setImage(slaps[Math.floor(Math.random() * slaps.length)])
                .setDescription(`${message.author.username} slapped ${user.username}!`)
        );

    }

}