import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Role, MessageEmbed } from 'discord.js';
import Escapes from '@oadpoaw/escapes';
import Handlers from '../functions/Handlers';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'roleCreate');
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

        if (!guild.logging_enabled || !guild.logging_role_create) return;

        const embed = new MessageEmbed()
            .setColor(role.color)
            .setTimestamp()
            .setTitle(`Role created`)
            .addField('Name', Escapes.backticks(role.name), true)
            .addField('Role Color', `${role.hexColor}`, true);

        if (role.managed) embed.addField(`Bot's role`, 'Yes', true);

        if (role.guild.me?.hasPermission('VIEW_AUDIT_LOG')) {
            const logs = await role.guild.fetchAuditLogs({
                limit: 1,
                type: 'ROLE_CREATE',
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
