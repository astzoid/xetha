import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'prefix',
            description: "Shows the Bot's Prefix",
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

    public async execute(message: Message) {
        const prefix = await this.client.dispatcher.generators.prefix(message);

        await message.channel.send(
            new MessageEmbed()
                .setColor(0x00ffff)
                .setTitle('Xetha Bot')
                .setDescription(
                    `My prefix${
                        message.guild ? ` for this server ` : ' '
                    }is \`${prefix}\``,
                ),
        );
    }
}
