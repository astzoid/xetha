import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Role, MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';
import Utils from '../utils/Utils';
import Escapes from '@xetha/escapes';

export default class extends DiscordEvent {

    constructor(client: Disclosure) {
        super(client, 'roleUpdate');
    }

    async exec(oldRole: Role, newRole: Role) {

        if (this.client.managers.blacklist.getServer(newRole.guild.id) ||
            this.client.managers.blacklist.getUser(newRole.guild.ownerID)) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(newRole.guild.id, newRole.guild.name);

        if (!guild.logging_enabled || !guild.logging_role_update) {
            return;
        }

        const embed = new MessageEmbed()
            .setColor(Colors.gray)
            .setTimestamp()
            .setTitle(`Role updated`);

        if (oldRole.position !== newRole.position) {
            return;
        }

        if (oldRole.name !== newRole.name) {
            embed.addField('Name', `Before: \`${Escapes.backticks(oldRole.name)}\`\nAfter: \`${Escapes.backticks(newRole.name)}\``, true);
        }

        if (oldRole.color !== newRole.color) {
            embed.addField('Color', `Before: \`${oldRole.hexColor}\`\nAfter: \`${newRole.hexColor}\``);
        }

        if (newRole.guild.me.hasPermission('VIEW_AUDIT_LOG')) {

            const logs = await newRole.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_UPDATE' });
            const log = logs.entries.find(l => l.target instanceof Role && l.target.id === newRole.id);

            if (log && log.executor.id !== this.client.user.id) {
                embed.setAuthor(`${log.executor.tag} / ${log.executor.id}`, log.executor.displayAvatarURL({ dynamic: true }));
            }

            if (log.reason) {
                embed.addField('Reason', log.reason, true);
            }
        }

        await Handlers.logging(this.client, embed, newRole.guild, guild);

    }

}