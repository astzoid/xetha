import { Disclosure, Command } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'support',
            description: "Sends Xetha's Support Discord Server",
            cooldown: 3,
            args: 0,
            usage: ['support'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    public async execute(message: Message) {
        const OWNER = await this.client.users.fetch(
            this.client.config.ownerID[0],
        );

        return message.channel.send(
            new MessageEmbed()
                .setColor(0x00ffff)
                .setTitle('Xetha Development')
                .setDescription(`${this.client.xetha.support.invite}`)
                .setFooter(`Made by ${OWNER.tag}`),
        );
    }
}
