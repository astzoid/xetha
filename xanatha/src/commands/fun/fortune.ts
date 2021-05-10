import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import fortune from '../../assets/fortunes';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    public constructor(client: Disclosure) {
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

    public async execute(message: Message) {
        await message.channel.send(
            new MessageEmbed()
                .setColor(Colors.random)
                .setAuthor(
                    'Your fortune 🥠 says...',
                    this.client.user?.displayAvatarURL({ dynamic: true }),
                )
                .setDescription(
                    fortune[Math.floor(Math.random() * fortune.length)],
                ),
        );
    }
}
