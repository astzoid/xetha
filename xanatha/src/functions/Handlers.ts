import {
    Message,
    Collection,
    MessageEmbed,
    TextChannel,
    Guild as DiscordGuild,
} from 'discord.js';
import Random from '@oadpoaw/random';
import { Colors } from '../utils/Constants';
import WebhookUtil from '../utils/WebhookUtil';
import Leveling from '../modules/Leveling';
import type { GuildAttributes } from '../database/models/Guild';
import type { Disclosure } from 'disclosure-discord';

const LevelingCooldown: Collection<
    string,
    Collection<string, number>
> = new Collection();

const Handlers = {
    async logging(
        client: Disclosure,
        embed: MessageEmbed | string,
        guild: DiscordGuild,
        guildSettings: GuildAttributes,
    ) {
        const channel =
            guildSettings.logging_enabled && guildSettings.logging_channel_id
                ? (guild.channels.cache.get(
                      guildSettings.logging_channel_id,
                  ) as TextChannel)
                : null;

        if (channel) await WebhookUtil.send(client, guild, channel.id, embed);
    },

    async levelingModule(message: Message, guild: GuildAttributes) {
        if (!guild.leveling_enabled) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(
                        `Oh oh, it seems that the Leveling module is disabled`,
                    )
                    .addField(
                        `Enable it using`,
                        `\`${guild.prefix}leveling enable\``,
                    ),
            );
        }
        return false;
    },

    async leveling(
        client: Disclosure,
        message: Message,
        guild: GuildAttributes,
    ) {
        if (!message.guild || !message.guild.me) return;
        if (guild.leveling_enabled) {
            if (!LevelingCooldown.has(guild.guild_id))
                LevelingCooldown.set(guild.guild_id, new Collection());

            const cooldowns = LevelingCooldown.get(guild.guild_id);

            if (!cooldowns?.has(message.author.id)) {
                const member = await client.managers.members.fetch(
                    guild.guild_id,
                    message.author.id,
                    message.author.tag,
                );

                const nextlevel = Leveling.nextlevel(member);
                member.experience += Random.number(
                    guild.leveling_maximum,
                    guild.leveling_minimum,
                );
                const newlevel = Leveling.level(member);

                await member.save();

                cooldowns?.set(message.author.id, 0);
                client.setTimeout(
                    () => cooldowns?.delete(message.author.id),
                    guild.leveling_cooldown * 1000,
                );

                if (nextlevel === newlevel) {
                    const msg = guild.leveling_message
                        .replace(/{{user}}/g, message.author.toString())
                        .replace(/{{new_level}}/g, newlevel.toString())
                        .replace(/{{old_level}}/g, (newlevel - 1).toString())
                        .replace(/{{user_tag}}/g, message.author.tag)
                        .replace(/{{user_id}}/g, message.author.id);

                    const log_channel = guild.leveling_log_channel
                        ? (message.guild.channels.cache.get(
                              guild.leveling_log_channel,
                          ) as TextChannel)
                        : null;

                    try {
                        if (
                            log_channel &&
                            log_channel.type === 'text' &&
                            log_channel
                                .permissionsFor(message.guild.me)
                                ?.has(['VIEW_CHANNEL', 'SEND_MESSAGES'])
                        ) {
                            await log_channel.send(msg);
                        } else {
                            await message.channel.send(msg);
                        }
                    } catch (error) {
                        if (guild.logging_errors) {
                            await Handlers.logging(
                                client,
                                new MessageEmbed()
                                    .setColor(Colors.red)
                                    .setAuthor('Error Message')
                                    .setTitle(`Module Leveling`)
                                    .setDescription(
                                        `I couldn't send the levelup message for '${message.author.tag}/${message.author.id}' for leveling up`,
                                    )
                                    .addField(`Reason`, error.message),
                                message.guild,
                                guild,
                            ).catch((error) => client.logger.error(error));
                        }
                    }

                    const reward = guild.leveling_role_rewards.find(
                        (role) => role.level === newlevel,
                    );

                    if (reward) {
                        const role = message.guild.roles.cache.get(reward.id);

                        if (
                            role &&
                            message.guild.me.roles.highest.comparePositionTo(
                                role,
                            ) > 0
                        ) {
                            await message.member?.roles
                                .add(role, `[Leveling] role reward`)
                                .catch(async (error) => {
                                    if (message.guild && guild.logging_errors) {
                                        await Handlers.logging(
                                            client,
                                            new MessageEmbed()
                                                .setColor(Colors.red)
                                                .setAuthor('Error Message')
                                                .setTitle(`Module Leveling`)
                                                .setDescription(
                                                    `I couldn't add the role reward '${role.name}/${role.id}' to '${message.author.tag}/${message.author.id}' for leveling up`,
                                                )
                                                .addField(
                                                    `Reason`,
                                                    error.message,
                                                ),
                                            message.guild,
                                            guild,
                                        );
                                    }
                                })
                                .catch((error) => client.logger.error(error));
                        }
                    }
                }
            }
        }
    },
};
export default Handlers;
