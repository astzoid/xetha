import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import Escapes from '@oadpoaw/escapes';
import shorten from '@oadpoaw/shorten';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'messageDelete');
    }

    public async exec(message: Message) {
        if (!message.guild) return;
        if (
            this.client.managers.blacklist.getServer(message.guild.id) ||
            this.client.managers.blacklist.getUser(message.guild.ownerID)
        )
            return;

        const guild = await this.client.managers.guilds.fetch(
            message.guild.id,
            message.guild.name,
        );

        if (!guild.logging_enabled || !guild.logging_message_delete) return;

        const embed = new MessageEmbed()
            .setColor(Colors.red)
            .setTimestamp()
            .setAuthor(
                `${message.author.tag} / ${message.author.id}`,
                message.author.displayAvatarURL({ dynamic: true }),
            )
            .setTitle(`Message deleted`)
            .addField(
                'Content',
                `\`\`\`\n${Escapes.backticks(
                    shorten(message.cleanContent, 1000),
                )}\n\`\`\``,
            );

        if (message.guild.me?.hasPermission('VIEW_AUDIT_LOG')) {
            const logs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE',
            });
            const log = logs.entries.find(
                (l) =>
                    l.target instanceof Message && l.target.id === message.id,
            );

            if (log && log.executor.id !== this.client.user?.id) {
                embed.setFooter(
                    `Deleted by ${log.executor.tag} / ${log.executor.id}`,
                    log.executor.displayAvatarURL({ dynamic: true }),
                );
            }

            if (log?.reason) embed.addField('Reason', log?.reason, true);
        }

        await Handlers.logging(this.client, embed, message.guild, guild);
    }
}
