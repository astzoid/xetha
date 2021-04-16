import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';
import Utils from '../utils/Utils';
import Escapes from '@xetha/escapes';

export default class extends DiscordEvent {

    constructor(client: Disclosure) {
        super(client, 'messageUpdate');
    }

    async exec(oldMessage: Message, newMessage: Message) {

        if (this.client.managers.blacklist.getServer(newMessage.guild.id) ||
            this.client.managers.blacklist.getUser(newMessage.guild.ownerID)) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(newMessage.guild.id, newMessage.guild.name);

        /**
         * Chat Filter: start
         */



        /**
         * Chat Filter: end
         */

        if (!guild.logging_enabled ||
            !guild.logging_message_update ||
            oldMessage.cleanContent === newMessage.cleanContent || newMessage.author.bot
        ) {
            return;
        }

        const embed = new MessageEmbed()
            .setColor(Colors.gray)
            .setTimestamp()
            .setAuthor(`${newMessage.author.tag} / ${newMessage.author.id}`, newMessage.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`Message updated`)
            .addField('Before', `\`\`\`\n${Escapes.backticks(Utils.shorten(oldMessage.cleanContent, 1000))}\n\`\`\``)
            .addField('After', `\`\`\`\n${Escapes.backticks(Utils.shorten(newMessage.cleanContent, 1000))}\n\`\`\``);

        await Handlers.logging(this.client, embed, newMessage.guild, guild);

    }

}