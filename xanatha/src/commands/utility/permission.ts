import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'permission',
            description:
                'Tells you your permission level for the current message guild location',
            cooldown: 3,
            args: 0,
            usage: ['permission'],
            aliases: ['permissions'],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: true,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const guild = await this.client.managers.guilds.fetch(
            message.guild.id,
            message.guild.name,
        );
        const profile = await this.client.managers.profiles.fetch(
            message.author.id,
            message.author.tag,
        );

        const friendly = this.client.managers.permissions.levels[
            this.client.managers.permissions.level(message, guild, profile)
        ];

        message.channel.send(
            new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true }),
                )
                .setDescription(
                    `Permission Level : ${this.client.managers.permissions.level(
                        message,
                        guild,
                        profile,
                    )} - ${friendly}`,
                ),
        );
    }
}
