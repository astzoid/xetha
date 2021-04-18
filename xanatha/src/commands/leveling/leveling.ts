import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import Escapes from '@xetha/escapes';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'leveling',
            description: 'Setup the leveling system',
            cooldown: 3,
            args: 0,
            usage: [
                'leveling',
                'leveling <...args>',
                'leveling enable',
                'leveling disable',
                'leveling min <Number>',
                'leveling max <Number>',
                'leveling cooldown <Number>',
                'leveling rewards',
                'leveling reward add <Level> <Role>',
                'leveling reward remove <Level>',
                'leveling message <Message>',
                'leveling channel <#channel|none>',
            ],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: true,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const args = argv._;
        const guild = await this.client.managers.guilds.fetch(
            message.guild.id,
            message.guild.name,
        );

        if (args.length) {
            switch (args.shift()) {
                case 'enable': {
                    if (guild.leveling_enabled)
                        return message.channel.send(
                            `<:no:800415449488556053> Leveling module is already enabled`,
                        );
                    guild.leveling_enabled = true;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Leveling module has been enabled`,
                    );
                }
                case 'disable': {
                    if (!guild.leveling_enabled)
                        return message.channel.send(
                            `<:no:800415449488556053> Leveling module is already disabled`,
                        );
                    guild.leveling_enabled = false;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Leveling module has been disabled`,
                    );
                }
                case 'min': {
                    if (!args[0])
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling min <Minimum Experience>\n\`\`\`\nMissing argument for Minimum Experience, please try again`,
                        );
                    const min = Math.floor(Number(args[0]));
                    if (isNaN(min))
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling min <Minimum Experience>\n\`\`\`\nMinimum Experience should be a number, please try again`,
                        );
                    if (min < 0 || min > guild.leveling_maximum)
                        return message.channel.send(
                            `<:no:800415449488556053> The Minimum exp should be less than or equal to the maximum exp and and it should be not a negative number, please try again`,
                        );
                    guild.leveling_minimum = min;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Minimum Experience has been set to \`${min}\``,
                    );
                }
                case 'max': {
                    if (!args[0])
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling max <Maximum Experience>\n\`\`\`\nMissing argument for Maximum Experience, please try again`,
                        );
                    const max = Math.floor(Number(args[0]));
                    if (isNaN(max))
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling max <Maximum Experience>\n\`\`\`\nMaximum Experience should be a number, please try again`,
                        );
                    if (max < 0 || max < guild.leveling_minimum)
                        return message.channel.send(
                            `<:no:800415449488556053> The Maximum exp should be greater than or equal to the minimum exp and it should be not a negative number, please try again`,
                        );
                    guild.leveling_maximum = max;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Maximum Experience has been set to \`${max}\``,
                    );
                }
                case 'cooldown': {
                    if (!args[0])
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling cooldown <Duration>\n\`\`\`\nMissing argument for Duration (in seconds)`,
                        );
                    const cooldown = Math.floor(Number(args[0]));
                    if (isNaN(cooldown))
                        return message.channel.send(
                            `<:no:800415449488556053> Error"\n\`\`\`xl\n${guild.prefix}leveling cooldown <Duration>\n\`\`\`Duration should be a valid duration (in seconds), please try again`,
                        );
                    if (cooldown < 0)
                        return message.channel.send(
                            `<:no:800415449488556053> The Duration should not be a negative number, please try again`,
                        );
                    guild.leveling_cooldown = cooldown;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Experience Cooldown has been set to \`${cooldown}\` seconds`,
                    );
                }
                case 'reward': {
                    if (!args[0])
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward <A> <B> [C]\n\`\`\`Missing arguments for A, B and C\nParameter A should be either \`add\` or \`remove\`\nParameter B should be a number and parameter C should be a valid role, please try again`,
                        );
                    if (!['add', 'remove'].includes(args[0].toLowerCase()))
                        return message.channel.send(
                            `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward <A> <B> [C]\n\`\`\`Incorrect argument for A, it should be either \`add\` \`remove\`, please try again`,
                        );
                    const action = args.shift().toLowerCase() as
                        | 'add'
                        | 'remove';
                    if (action === 'add') {
                        if (!args[0])
                            return message.channel
                                .send(`<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward add <A> <B>\n\`\`\`Missing arguments for A and B\n
                        Parameter A should be a valid number and parameter B should be a valid role, please try again`);
                        const level = Math.floor(Number(args.shift()));
                        if (isNaN(level))
                            return message.channel.send(
                                `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward add <A> <B>\n\`\`\`Parameter A should be a number and parameter B should be a valid role, please try again`,
                            );
                        if (level <= 0)
                            return message.channel.send(
                                `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward add <A> <B>\n\`\`\`Parameter A greater than 0 and parameter B should be a valid role, please try again`,
                            );
                        const exists = guild.leveling_role_rewards.find(
                            (r) => r.level === level,
                        );
                        if (exists)
                            return message.channel.send(
                                `<:no:800415449488556053> Oh oh, it seems that level is already assigned to a role, please try a different level to assign and try again!`,
                            );
                        if (!args[0])
                            return message.channel.send(
                                `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward add ${level} <Role>\n\`\`\`Missing argument for role and it should be a valid role, please try again`,
                            );
                        const role = this.client.resolveRole(
                            args.join(' '),
                            message.guild,
                        );
                        if (!role)
                            return message.channel.send(
                                `<:no:800415449488556053> That's an invalid role, please try again`,
                            );
                        if (role.managed)
                            return message.channel.send(
                                `<:no:800415449488556053> Sorry, that role cannot be assigned to anyone else`,
                            );
                        if (
                            message.guild.me.roles.highest.comparePositionTo(
                                role,
                            ) <= 0
                        )
                            return message.channel.send(
                                `<:no:800415449488556053> Oh oh, it seems i don't have access to that role, please make sure my role is above that role for this to work, and try again`,
                            );
                        guild.leveling_role_rewards.push({
                            id: role.id,
                            level,
                        });
                        await guild.save();
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(0x66ff00)
                                .setDescription(
                                    `<@&${role.id}> has been assigned to be rewarded on level \`${level}\``,
                                )
                                .setTimestamp(),
                        );
                    }
                    if (action === 'remove') {
                        if (!args[0])
                            return message.channel.send(
                                `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward remove <Level>\n\`\`\`Missing argument for Level, and it should be a number, please try again`,
                            );
                        const level = Math.floor(Number(args.shift()));
                        if (isNaN(level))
                            return message.channel.send(
                                `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward remove <Level>\n\`\`\`The Level should be a number, please try again`,
                            );
                        if (level <= 0)
                            return message.channel.send(
                                `<:no:800415449488556053> Error:\n\`\`\`xl\n${guild.prefix}leveling reward remove <Level>\n\`\`\`The Level should be greater than 0, please try again`,
                            );
                        const role = guild.leveling_role_rewards.find(
                            (r) => r.level === level,
                        );
                        if (!role)
                            return message.channel.send(
                                `<:no:800415449488556053> Oh oh, it seems that there is no role is assigned to that level, please try again`,
                            );
                        guild.leveling_role_rewards = guild.leveling_role_rewards.filter(
                            (r) => r.level === level,
                        );
                        await guild.save();
                        const prole = message.guild.roles.cache.get(role.id);
                        return message.channel.send(
                            `<:yes:800415381340684330> \`${
                                prole || 'Deleted Role'
                            }\` has been unassigned to level \`${level}\``,
                        );
                    }
                }
                case 'rewards': {
                    return message.channel.send(
                        new MessageEmbed()
                            .setColor('RANDOM')
                            .setTitle(`Role Rewards`)
                            .setDescription(
                                `${guild.leveling_role_rewards
                                    .sort((a, b) => b.level - a.level)
                                    .map(
                                        (r) =>
                                            `Level **${r.level}** - <@&${r.id}>`,
                                    )
                                    .join('\n')}`,
                            ),
                    );
                }
                case 'message': {
                    const msg = args.join(' ');
                    if (!msg.length)
                        return message.channel.send(
                            `<:no:800415449488556053> Oh oh, it seems you did not provide any message for the level up message`,
                        );
                    guild.leveling_message = msg;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Successfully set a new levelup message!\n\nTip: (You can use these placeholders to coolen the message)\n\`{{user}}\` to mention the user\n\`{{new_level}}\` to get the user's new level\n\`{{old_level}}\` to get the user's old level\n\`{{user_tag}}\` to get the user's tag\n\`{{user_id}}\` to get the user's id`,
                    );
                }
                case 'channel': {
                    if (args[0] === 'none') {
                        guild.leveling_log_channel = '';
                        await guild.save();
                        return message.channel.send(
                            `<:yes:800415381340684330> Successfully set level up messages on any channel`,
                        );
                    }
                    const channel = this.client.resolveChannel(
                        args.join(' '),
                        message.guild,
                    ) as TextChannel;
                    if (!channel || channel.type !== 'text')
                        return message.channel.send(
                            `<:no:800415449488556053> That is not a valid text channel, please try again`,
                        );
                    if (
                        !channel
                            .permissionsFor(message.guild.me)
                            .has(['SEND_MESSAGES'])
                    )
                        return message.channel.send(
                            `<:no:800415449488556053> Oh oh, it seems i don't have permission to send messages to that channel\nPlease make sure i have the permissions to send messages to that channel and try again!`,
                        );
                    guild.leveling_log_channel = channel.id;
                    await guild.save();
                    return message.channel.send(
                        `<:yes:800415381340684330> Successfully set level up messages on channel <#${channel.id}>`,
                    );
                }
                default: {
                    break;
                }
            }
        }

        const channel = guild.leveling_log_channel.length
            ? message.guild.roles.cache.get(guild.leveling_log_channel)
            : null;

        message.channel.send(
            new MessageEmbed()
                .setColor(0x66ff00)
                .setTitle(`Leveling Module`)
                .addField(
                    `Status`,
                    `${
                        guild.leveling_enabled
                            ? `<:yes:800415381340684330> Enabled`
                            : `<:no:800415449488556053> Disabled`
                    }`,
                    true,
                )
                .addField(
                    `Settings`,
                    `Minimum XP: ${guild.leveling_minimum}\nMaximum XP: ${
                        guild.leveling_maximum
                    }\nCooldown: ${
                        guild.leveling_cooldown
                    } second(s)\nLog Channel: ${
                        channel ? `<#${channel.id}>` : 'none'
                    }`,
                    true,
                )
                .addField(
                    `Role Rewards`,
                    `See \`${guild.prefix}leveling rewards\``,
                    true,
                )
                .addField(
                    `Levelup Message`,
                    `\`\`\`\n${Escapes.backticks(
                        guild.leveling_message,
                    )}\n\`\`\``,
                    false,
                )
                .addField(
                    `Command Usage`,
                    `\`\`\`\n${this.config.usage.join('\n')}\n\`\`\``,
                    false,
                ),
        );
    }
}
