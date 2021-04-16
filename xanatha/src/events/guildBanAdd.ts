import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Guild, User, MessageEmbed, GuildMember } from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';
import wait from '../utils/wait';

export default class extends DiscordEvent {

    constructor(client: Disclosure) {
        super(client, 'guildBanAdd');
    }

    async exec(dguild: Guild, user: User) {

        if (this.client.managers.blacklist.getServer(dguild.id) ||
            this.client.managers.blacklist.getUser(dguild.ownerID)) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(dguild.id, dguild.name);

        if (!guild.logging_enabled && !guild.logging_member_ban_add) {
            return;
        }

        const embed = new MessageEmbed()
            .setColor(Colors.red)
            .setTimestamp()
            .setTitle(`User banned`)
            .setDescription(`<@${user.id}> / ${user.tag} / ${user.id} has been banned`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }));

        await wait(1000);

        if (dguild.me.hasPermission('VIEW_AUDIT_LOG')) {

            const logs = await dguild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN_ADD' });
            const log = logs.entries.find(l => l.target instanceof GuildMember && l.target.id === user.id);

            if (log && log.executor.id !== this.client.user.id) {
                embed.setAuthor(`${log.executor.tag} / ${log.executor.id}`, log.executor.displayAvatarURL({ dynamic: true }));
            }

            if (log.reason) {
                embed.addField('Reason', log.reason, true);
            }
        }

        await Handlers.logging(this.client, embed, dguild, guild);

    }

}