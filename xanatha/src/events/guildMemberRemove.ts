import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { GuildMember, MessageEmbed } from 'discord.js';
import Handlers from '../functions/Handlers';
import { Colors } from '../utils/Constants';

export default class extends DiscordEvent {

    constructor(client: Disclosure) {
        super(client, 'guildMemberRemove');
    }

    async exec(member: GuildMember) {

        if (this.client.managers.blacklist.getServer(member.guild.id) ||
            this.client.managers.blacklist.getUser(member.guild.ownerID)) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(member.guild.id, member.guild.name);

        if (guild.logging_enabled && guild.logging_member_remove) {

            const embed = new MessageEmbed()
                .setColor(Colors.red)
                .setTimestamp()
                .setTitle(`${member.user.bot ? 'Bot' : ''} Member left`)
                .setDescription(`<@${member.user.id}> / ${member.user.tag} / ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addField(`Joined Server`, member.joinedAt.toUTCString(), true)
                .addField(`Roles`, `${member.roles.cache.map(r => `<@&${r.id}>`).join(', ')}`);

            if (member.guild.me.hasPermission('VIEW_AUDIT_LOG') && guild.logging_member_kick) {

                const logs = await member.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' });
                const log = logs.entries.find(l => l.target instanceof GuildMember && l.target.id === member.user.id);

                if (log && log.executor.id !== this.client.user.id) {
                    embed.setAuthor(`${log.executor.tag} / ${log.executor.id}`, log.executor.displayAvatarURL({ dynamic: true }));
                }

                if (log.reason) {
                    embed.addField('Reason', log.reason, true);
                }
            }

            await Handlers.logging(this.client, embed, member.guild, guild);

        }

    }

}