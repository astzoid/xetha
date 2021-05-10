import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import Escapes from '@oadpoaw/escapes';
import shorten from '@oadpoaw/shorten';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'messageUpdate');
    }

    public async exec(oldMessage: Message, newMessage: Message) {
        if (
            !oldMessage.guild ||
            !newMessage.guild ||
            oldMessage.cleanContent === newMessage.cleanContent ||
            newMessage.author.bot
        )
            return;
        if (
            this.client.managers.blacklist.getServer(newMessage.guild.id) ||
            this.client.managers.blacklist.getUser(newMessage.guild.ownerID)
        )
            return;

        const guild = await this.client.managers.guilds.fetch(
            newMessage.guild.id,
            newMessage.guild.name,
        );

        /**
         * Chat Filter: start
         */

        /**
         * Chat Filter: end
         */

        if (
            oldMessage.cleanContent === newMessage.cleanContent ||
            newMessage.author.bot
        )
            return;

        const embed = new MessageEmbed()
            .setColor(Colors.gray)
            .setTimestamp()
            .setAuthor(
                `${newMessage.author.tag} / ${newMessage.author.id}`,
                newMessage.author.displayAvatarURL({ dynamic: true }),
            )
            .setTitle(`Message updated`)
            .addField(
                'Before',
                `\`\`\`\n${Escapes.backticks(
                    shorten(oldMessage.cleanContent, 1000),
                )}\n\`\`\``,
            )
            .addField(
                'After',
                `\`\`\`\n${Escapes.backticks(
                    shorten(newMessage.cleanContent, 1000),
                )}\n\`\`\``,
            );

        await Handlers.logging(this.client, embed, newMessage.guild, guild);
    }
}
