import Random from '@oadpoaw/random';
import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/Constants';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'penis',
            description: "Calculates your penis size till it's smallest form",
            cooldown: 5,
            args: 0,
            usage: ['penis [user]'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message, argv: Arguments) {
        let target =
            (await this.client.resolveUser(argv._[0])) ?? message.author;

        if (!target) target = message.author;

        const embed = new MessageEmbed()
            .setColor(Colors.random)
            .setTitle(`${target.tag}\'s penis`);

        const max = Random.number(30, 0);
        let gland = '';

        for (let i = 0; i < max; i++) {
            gland += '=';
        }

        embed.setDescription(`8${gland}D`);

        return message.channel.send(embed);
    }
}
