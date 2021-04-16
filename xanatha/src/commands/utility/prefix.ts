import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'prefix',
            description: 'Shows the Bot\'s Prefix',
            cooldown: 5,
            args: 0,
            usage: ['prefix'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {

        const prefix = await this.client.dispatcher.generators.prefix(message);

        message.channel.send(
            new MessageEmbed()
                .setColor(0x00ffff)
                .setTitle('Xetha Bot')
                .setDescription(`My prefix${message.guild ? ` for this server ` : ' '}is \`${prefix}\``)
        );

    }

}