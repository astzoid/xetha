import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { GuildMember, MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';

export default class extends DiscordEvent {
    constructor(client: Disclosure) {
        super(client, 'guildMemberAdd');
    }

    async exec(member: GuildMember) {
        if (
            this.client.managers.blacklist.getServer(member.guild.id) ||
            this.client.managers.blacklist.getUser(member.guild.ownerID)
        ) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(
            member.guild.id,
            member.guild.name,
        );

        if (guild.logging_enabled && guild.logging_member_add) {
            const embed = new MessageEmbed()
                .setColor(Colors.lime)
                .setTimestamp()
                .setTitle(
                    `<@${member.user.id}> / ${
                        member.user.bot ? 'Bot' : ''
                    } Member joined`,
                )
                .setDescription(`${member.user.tag} / ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addField(
                    `Created At`,
                    member.user.createdAt.toUTCString(),
                    true,
                );

            const user = this.client.managers.blacklist.getUser(member.user.id);

            if (user) {
                embed.addField(
                    `WARNING`,
                    `This \`${
                        member.user.bot ? 'bot' : 'user'
                    }\` has been blacklisted by Xetha\nReason: \`${
                        user.reason
                    }\`\nIssued by: \`${user.moderator}\``,
                );
            }

            await Handlers.logging(this.client, embed, member.guild, guild);
        }
    }
}
