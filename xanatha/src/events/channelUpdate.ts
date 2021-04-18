import { DiscordEvent, Disclosure } from 'disclosure-discord';
import {
    DMChannel,
    GuildChannel,
    MessageEmbed,
    TextChannel,
    VoiceChannel,
} from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';
import Escapes from '@xetha/escapes';
import differentiate from '@xetha/differentiate';

export default class extends DiscordEvent {
    constructor(client: Disclosure) {
        super(client, 'channelUpdate');
    }

    async exec(
        oldChannel: DMChannel | GuildChannel,
        newChannel: DMChannel | GuildChannel,
    ) {
        if (oldChannel.type === 'dm' || newChannel.type === 'dm') {
            return;
        }

        if (
            this.client.managers.blacklist.getServer(newChannel.guild.id) ||
            this.client.managers.blacklist.getUser(newChannel.guild.ownerID)
        ) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(
            newChannel.guild.id,
            newChannel.guild.name,
        );

        if (!guild.logging_enabled && !guild.logging_channel_update) {
            return;
        }

        const embed = new MessageEmbed()
            .setColor(Colors.silver)
            .setTimestamp()
            .setTitle(`Channel Update: ${newChannel.name}`)
            .setDescription(
                `<#${newChannel.id}> was updated\nType: \`${newChannel.type}\``,
            );

        if (oldChannel.position !== newChannel.position) {
            return;
        }

        if (oldChannel.name !== newChannel.name) {
            embed.addField(
                'Name',
                `Before: \`${oldChannel.name}\`\nAfter: \`${newChannel.name}\``,
            );
        }

        if (newChannel.type === 'text' && oldChannel.type === 'text') {
            const oC = oldChannel as TextChannel;
            const nC = newChannel as TextChannel;

            if (oC.nsfw !== nC.nsfw) {
                embed.addField(
                    'NSFW',
                    nC.nsfw
                        ? `<:yes:800415381340684330>`
                        : `<:no:800415449488556053>`,
                );
            }

            if (oC.topic !== nC.topic) {
                embed.addField(
                    'Topic',
                    `Before: \`${Escapes.backticks(
                        oC.topic,
                    )}\`\nAfter: \`${Escapes.backticks(nC.topic)}\``,
                );
            }
        }

        if (newChannel.type === 'voice' && oldChannel.type === 'voice') {
            const oC = oldChannel as VoiceChannel;
            const nC = newChannel as VoiceChannel;

            if (oC.bitrate !== nC.bitrate) {
                embed.addField(
                    'Bitrate',
                    `Before: \`${oC.bitrate}\`\nAfter: \`${nC.bitrate}\``,
                );
            }
        }

        let oldOverwrites = oldChannel.permissionOverwrites.map((o) => o);
        let newOverwrites = newChannel.permissionOverwrites.map((o) => o);

        const uniques =
            oldOverwrites.length > newOverwrites.length
                ? differentiate(oldOverwrites, newOverwrites)
                : differentiate(newOverwrites, oldOverwrites);

        let type: number;

        if (newOverwrites.length > oldOverwrites.length) {
            newOverwrites = newOverwrites.filter((o) => !uniques.includes(o));
            type = 13;
        } else if (oldOverwrites.length > newOverwrites.length) {
            oldOverwrites = oldOverwrites.filter((o) => !uniques.includes(o));
            type = 15;
        } else if (
            newChannel.name !== oldChannel.name ||
            (newChannel instanceof TextChannel &&
                oldChannel instanceof TextChannel &&
                (newChannel.topic !== oldChannel.topic ||
                    newChannel.nsfw !== oldChannel.nsfw))
        ) {
            type = 11;
        } else {
            type = 14;
        }

        for (const overwrite of newOverwrites) {
            const oldOverwrite = oldOverwrites.find(
                (o) => o.id === overwrite.id,
            );

            if (!overwrite || !oldOverwrite) {
                continue;
            }

            const permJsonNew = overwrite.toJSON() as { [k: string]: boolean };
            const permJsonOld = oldOverwrite.toJSON() as {
                [k: string]: boolean;
            };

            const newPerms = Object.keys(permJsonNew);
            const oldPerms = Object.keys(permJsonOld);

            let differentPerms = differentiate(newPerms, oldPerms);

            if (
                newChannel.permissionOverwrites
                    .map((o) => `${o.allow}|${o.deny}`)
                    .toString() ===
                oldChannel.permissionOverwrites
                    .map((o) => `${o.allow}|${o.deny}`)
                    .toString()
            ) {
                continue;
            }

            let overwriteName = overwrite.type + ' ';

            if (overwrite.type === 'member') {
                const member = newChannel.guild.members.cache.get(overwrite.id);

                if (member) {
                    overwriteName += member.nickname ? `(${member.user})` : '';
                }
            } else {
                const role = newChannel.guild.roles.cache.find(
                    (r) => r.id === overwrite.id,
                );

                overwriteName += role.name;
            }

            const field = { name: overwriteName, value: '', inline: true };

            for (const perm of differentPerms) {
                if (
                    permJsonNew.hasOwnProperty(perm) &&
                    permJsonOld.hasOwnProperty(perm)
                ) {
                    if (
                        permJsonNew[perm] === true &&
                        permJsonOld[perm] === false
                    ) {
                        field.value += `\n${`<:yes:800415381340684330>`} ${perm}`;
                    } else if (
                        permJsonNew[perm] === false &&
                        permJsonOld[perm] === true
                    ) {
                        field.value += `\n${`<:no:800415449488556053>`} ${perm}`;
                    }
                } else if (
                    permJsonNew.hasOwnProperty(perm) &&
                    !permJsonOld.hasOwnProperty(perm)
                ) {
                    if (permJsonNew[perm]) {
                        field.value += `\n${`<:yes:800415381340684330>`} ${perm}`;
                    } else {
                        field.value += `\n${`<:no:800415449488556053>`} ${perm}`;
                    }
                } else if (
                    !permJsonNew.hasOwnProperty(perm) &&
                    permJsonOld.hasOwnProperty(perm)
                ) {
                    field.value += `\n⚖️ Neutral/Inherit ${perm}`;
                }
            }

            if (field.value) {
                if (overwrite.type === 'member') {
                    field.value = `<@${overwrite.id}>` + field.value;
                }

                embed.fields.push(field);
            }
        }

        if (newChannel.guild.me.hasPermission('VIEW_AUDIT_LOG')) {
            const logs = await newChannel.guild.fetchAuditLogs({
                limit: 5,
                type,
            });
            const log = logs.entries.find(
                (l) =>
                    l.target instanceof GuildChannel &&
                    l.target.id === newChannel.id,
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

        await Handlers.logging(this.client, embed, newChannel.guild, guild);
    }
}
