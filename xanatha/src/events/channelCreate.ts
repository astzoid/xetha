import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { DMChannel, GuildChannel, MessageEmbed } from 'discord.js';
import Handlers from '../functions/Handlers';
import { Colors } from '../utils/Constants';

export default class extends DiscordEvent {
    constructor(client: Disclosure) {
        super(client, 'channelCreate');
    }

    async exec(channel: DMChannel | GuildChannel) {
        if (channel.type === 'dm') {
            return;
        }

        if (
            this.client.managers.blacklist.getServer(channel.guild.id) ||
            this.client.managers.blacklist.getUser(channel.guild.ownerID)
        ) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(
            channel.guild.id,
            channel.guild.name,
        );

        if (!guild.logging_enabled && !guild.logging_channel_create) {
            return;
        }

        const embed = new MessageEmbed()
            .setColor(Colors.lime)
            .setTimestamp()
            .setTitle(`Channel Create: ${channel.name}`)
            .setDescription(`<#${channel.id}> was created`)
            .addField(`Type`, channel.type);

        if (channel.guild.me.hasPermission('VIEW_AUDIT_LOG')) {
            const logs = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: 'CHANNEL_CREATE',
            });
            const log = logs.entries.find(
                (l) =>
                    l.target instanceof GuildChannel &&
                    l.target.id === channel.id,
            );

            if (log && log.executor.id !== this.client.user.id) {
                embed.setAuthor(
                    `${log.executor.tag} / ${log.executor.id}`,
                    log.executor.displayAvatarURL({ dynamic: true }),
                );
            }

            if (log.reason) {
                embed.addField('Reason', log.reason, true);
            }
        }

        await Handlers.logging(this.client, embed, channel.guild, guild);
    }
}
