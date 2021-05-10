import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Role, MessageEmbed } from 'discord.js';
import Handlers from '../functions/Handlers';
import { Colors } from '../utils/Constants';
import Escapes from '@oadpoaw/escapes';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'roleDelete');
    }

    public async exec(role: Role) {
        if (
            this.client.managers.blacklist.getServer(role.guild.id) ||
            this.client.managers.blacklist.getUser(role.guild.ownerID)
        )
            return;

        const guild = await this.client.managers.guilds.fetch(
            role.guild.id,
            role.guild.name,
        );
        if (!guild.logging_enabled || !guild.logging_role_delete) return;

        const embed = new MessageEmbed()
            .setColor(Colors.red)
            .setTimestamp()
            .setTitle(`Role deleted`)
            .addField('Name', Escapes.backticks(role.name), true)
            .addField('Role Color', `${role.hexColor}`, true);

        if (role.managed) {
            embed.addField(`Bot's role`, 'yes', true);
        }

        if (role.guild.me?.hasPermission('VIEW_AUDIT_LOG')) {
            const logs = await role.guild.fetchAuditLogs({
                limit: 1,
                type: 'ROLE_DELETE',
            });
            const log = logs.entries.find(
                (l) => l.target instanceof Role && l.target.id === role.id,
            );

            if (log && log.executor.id !== this.client.user?.id) {
                embed.setAuthor(
                    `${log.executor.tag} / ${log.executor.id}`,
                    log.executor.displayAvatarURL({ dynamic: true }),
                );
            }

            if (log?.reason) embed.addField('Reason', log?.reason, true);
        }

        await Handlers.logging(this.client, embed, role.guild, guild);
    }
}
