import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/Constants';

const gateway = [
    'https://i.imgur.com/KJJxVi4.gif',
    'https://media.giphy.com/media/1Ubrzxvik2puE/giphy.gif',
    'https://media.giphy.com/media/l1KVaE9P0XcwJMwrC/giphy.gif',
];

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'fidgetspinner',
            description: 'Spinning spin spin spin fidget',
            cooldown: 30,
            args: 0,
            usage: ['fidgetspinner'],
            aliases: ['spin'],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const spinning = await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setDescription(
                    `${message.author.tag} is spinning a fidget spinner...`,
                )
                .setImage(gateway[Math.floor(Math.random() * gateway.length)]),
        );

        const timeout = Math.random() * (60 - 5 + 1) + 5;

        setTimeout(() => {
            spinning
                .edit(
                    new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(
                            `${
                                message.author.tag
                            }, you spun the fidget spinner for ${timeout.toFixed(
                                2,
                            )} seconds.`,
                        ),
                )
                .catch((e) => {
                    this.client.logger.error(e);
                });
        }, timeout * 1000);
    }
}
