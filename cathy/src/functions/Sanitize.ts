import { Guild, GuildSettings, RoleReward, WarningThreshold } from './Manager';
import { Keys } from './Validator';

type UnionSettings = {
    [key: string]: string[] | string | number | boolean;
};

const disallowed = [
    'premium',
    'disabled_commands',
    'listing_upvotes',
    'listing_downvotes',
    'moderation_cases',
    'tags_list',
];

const roleProperties = [
    'moderator_role',
    'administrator_role',
    'ticket_support_role',
    'tags_author_role',
];

const textChannelProperties = [
    'welcome_channel',
    'farewell_channel',
    'ticket_reaction_channel',
    'ticket_log_channel',
    'moderation_log_channel',
    'leveling_log_channel',
    'logging_channel_id'
];

const booleanProperties = [
    'moderation_filter_links',
    'moderation_filter_invite',
    'moderation_filter_caps',
    'moderation_filter_swear',
    'leveling_stack_rewards',
    'logging_errors',
    'logging_message_update',
    'logging_message_delete',
    'logging_channel_create',
    'logging_channel_update',
    'logging_channel_delete',
    'logging_role_create',
    'logging_role_update',
    'logging_role_delete',
    'logging_member_add',
    'logging_member_remove',
    'logging_member_update',
    'logging_member_kick',
    'logging_member_ban_add',
    'logging_member_ban_remove',
    'logging_member_voice_join',
    'logging_member_voice_leave',
    'logging_member_voice_move',
    'logging_member_voice_deafen',
    'logging_member_voice_muted',
    'logging_member_voice_server_deafen',
    'logging_member_voice_server_muted',
];

const stringArrayProperties = [
    'listing_tags',
    'moderation_banned_words',
    'moderation_whitelisted_words',
    'moderation_whitelisted_links'
];

const stringProperties = [
    'listing_description',
    'welcome_message',
    'farewell_message',
    'leveling_message',
];

export default function Sanitize(guild: Guild, raw: Partial<GuildSettings & UnionSettings>) {

    const data: Partial<GuildSettings & UnionSettings> = {};

    if (typeof raw !== 'object' || Array.isArray(raw) || !Keys(Object.keys(guild.settings), raw)) throw new Error('Bad Request');

    for (const key in raw) {

        if (typeof key !== 'string') throw new Error('Bad Request');

        if (disallowed.includes(key)) throw new Error('Bad Request');

        if (key.includes('enabled') || booleanProperties.includes(key)) {
            data[key] = Array.isArray(raw[key]);
            continue;
        }

        if (roleProperties.includes(key)) {
            if (typeof raw[key] === 'string') {
                if (guild.roles.find((role) => role.id === raw[key])) {
                    data[key] = raw[key];
                    continue;
                }
            }
            throw new Error('Bad Request');
        }

        if (textChannelProperties.includes(key)) {
            if (typeof raw[key] === 'string') {
                if (guild.channels
                    .filter((channel) => channel.type === 'text')
                    .find((channel) => channel.id === raw[key])) {
                    data[key] = raw[key];
                    continue;
                }
            }
            throw new Error('Bad Request');
        }

        if (stringArrayProperties.includes(key)) {
            const clone = (typeof raw[key] === 'string' ? [raw[key]] : raw[key]) as Array<string>;
            if (Array.isArray(clone)) {
                for (const val of clone) {
                    if (typeof val !== 'string') throw new Error('Bad Request');
                    continue;
                }
                data[key] = clone.map((val) => String.prototype.toLowerCase.call(val));
                continue;
            }
            throw new Error('Bad Request');
        }

        if (stringProperties.includes(key)) {
            if (typeof raw[key] === 'string') {
                data[key] = raw[key];
                continue;
            }
            throw new Error('Bad Request');
        }

        if (key === 'prefix') {
            if (typeof raw[key] === 'string') {
                if (raw[key].length && !raw[key].includes(' ')) {
                    data[key] = raw[key];
                    continue;
                }
            }
            throw new Error('Bad Request');
        }

        if (key === 'moderation_warning_thresholds') {
            if (Array.isArray(raw[key])) {
                const clone = raw[key] as Array<WarningThreshold>;
                const purged: Array<WarningThreshold> = [];
                for (const threshold of clone) {
                    if (typeof threshold === 'object' && !Array.isArray(threshold)) {
                        if (['mute', 'kick', 'softban', 'ban'].includes(threshold.action)) {
                            threshold.action = String.prototype.toLowerCase.call(threshold.action);
                            if (typeof threshold.threshold === 'number') {
                                if (threshold.threshold > 0) {
                                    if (purged.find((t) => t.threshold !== threshold.threshold)) {
                                        purged.push(threshold);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                    throw new Error('Bad Request');
                }
                data[key] = purged;
                continue;
            }
            throw new Error('Bad Request');
        }

        if (key === 'leveling_role_rewards') {
            if (Array.isArray(raw[key])) {
                const clone = raw[key] as Array<RoleReward>;
                const purged: Array<RoleReward> = [];
                for (const reward of clone) {
                    if (typeof reward === 'object' && !Array.isArray(reward)) {
                        if (typeof reward.id === 'string') {
                            if (typeof reward.level === 'number') {
                                if (guild.roles.find((r) => r.id === reward.id)) {
                                    if (purged.find((r) => r.id !== reward.id)) {
                                        if (purged.find((r) => r.level !== reward.level)) {
                                            purged.push(reward);
                                            continue;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    throw new Error('Bad Request');
                }
                data[key] = purged;
                continue;
            }
            throw new Error('Bad Request');
        }

    }

    return data;

}