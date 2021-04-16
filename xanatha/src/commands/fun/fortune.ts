import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fortune from '../../assets/fortunes';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'fortune',
            description: 'Gives you your fortune cookie',
            cooldown: 10,
            args: 0,
            usage: ['fortune'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {

        message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setAuthor('Your fortune 🥠 says...', this.client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(fortune[Math.floor(Math.random() * fortune.length)])
        );

    }

}