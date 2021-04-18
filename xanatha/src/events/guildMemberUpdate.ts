import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { GuildMember, MessageEmbed, Role } from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';

export default class extends DiscordEvent {
    constructor(client: Disclosure) {
        super(client, 'guildMemberUpdate');
    }

    async exec(oldMember: GuildMember, newMember: GuildMember) {
        if (
            this.client.managers.blacklist.getServer(newMember.guild.id) ||
            this.client.managers.blacklist.getUser(newMember.guild.ownerID)
        ) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(
            newMember.guild.id,
            newMember.guild.name,
        );

        if (!guild.logging_enabled || !guild.logging_member_update) {
            return;
        }

        if (newMember.partial) {
            await newMember.fetch();
        }

        const embed = new MessageEmbed()
            .setColor(Colors.gray)
            .setTimestamp()
            .setTitle(`${newMember.user.bot ? 'Bot' : ''} Member updated`)
            .setDescription(
                `<@${newMember.user.id}> / ${newMember.user.tag} / ${newMember.user.id}`,
            )
            .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }));

        if (oldMember.nickname !== newMember.nickname) {
            embed.addField(
                `Nickname`,
                `**Before**\n${oldMember.nickname}\n\n**After**\n${newMember.nickname}`,
                true,
            );
        }

        let type: 'MEMBER_UPDATE' | 'MEMBER_ROLE_UPDATE' = 'MEMBER_UPDATE';

        const added: Role[] = [
            ...newMember.roles.cache
                .difference(oldMember.roles.cache)
                .map((r) => r),
        ];
        const removed: Role[] = [
            ...oldMember.roles.cache
                .difference(newMember.roles.cache)
                .map((r) => r),
        ];

        if (added.length || removed.length) {
            type = 'MEMBER_ROLE_UPDATE';
        }

        if (added.length) {
            embed.addField(
                `Added Role(s)`,
                `${added.map((r) => `<@&${r.id}>`).join(', ')}`,
            );
        }

        if (removed.length) {
            embed.addField(
                `Removed Role(s)`,
                `${removed.map((r) => `<@&${r.id}>`).join(', ')}`,
            );
        }

        if (newMember.guild.me.hasPermission('VIEW_AUDIT_LOG')) {
            const logs = await newMember.guild.fetchAuditLogs({
                limit: 5,
                type,
            });
            const log = logs.entries.find(
                (l) =>
                    l.target instanceof GuildMember &&
                    l.target.id === newMember.user.id,
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

        await Handlers.logging(this.client, embed, newMember.guild, guild);
    }
}
