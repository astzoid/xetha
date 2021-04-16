import mongoose from 'mongoose';

const Guild = mongoose.model<GuildAttributes>('guild', new mongoose.Schema<GuildAttributes>({
    guild_id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    prefix: {
        type: String,
        default: '-',
    },
    moderator_role: {
        type: String,
        default: '',
    },
    administrator_role: {
        type: String,
        default: '',
    },
    disabled_commands: {
        type: Object,
        default: [],
    },
    listing_enabled: {
        type: Boolean,
        default: false,
    },
    listing_description: {
        type: String,
        default: '',
    },
    listing_upvotes: {
        type: Number,
        default: 0,
    },
    listing_tags: {
        type: Object,
        default: [],
    },
    welcome_enabled: {
        type: Boolean,
        default: false,
    },
    welcome_message: {
        type: String,
        default: 'Welcome {{user}} to the server!',
    },
    welcome_channel: {
        type: String,
        default: '',
    },
    farewell_enabled: {
        type: Boolean,
        default: false,
    },
    farewell_message: {
        type: String,
        default: 'Good bye {{user}} to the server.',
    },
    farewell_channel: {
        type: String,
        default: '',
    },
    ticket_enabled: {
        type: Boolean,
        default: false,
    },
    ticket_category: {
        type: String,
        default: '',
    },
    ticket_support_role: {
        type: String,
        default: '',
    },
    ticket_reaction_channel: {
        type: String,
        default: '',
    },
    ticket_log_channel: {
        type: String,
        default: '',
    },
    moderation_enabled: {
        type: Boolean,
        default: false,
    },
    moderation_cases: {
        type: Object,
        default: [],
    },
    moderation_log_channel: {
        type: String,
        default: '',
    },
    moderation_warning_enabled: {
        type: Boolean,
        default: false,
    },
    moderation_warning_thresholds: {
        type: Object,
        default: [],
    },
    moderation_banned_words_enabled: {
        type: Boolean,
        default: false,
    },
    moderation_banned_words: {
        type: Object,
        default: [],
    },
    moderation_whitelisted_words: {
        type: Object,
        default: [],
    },
    moderation_whitelisted_links: {
        type: Object,
        default: [],
    },
    moderation_filter_links: {
        type: Boolean,
        default: false,
    },
    moderation_filter_invite: {
        type: Boolean,
        default: false,
    },
    moderation_filter_caps: {
        type: Boolean,
        default: false,
    },
    moderation_filter_swear: {
        type: Boolean,
        default: false,
    },
    tags_enabled: {
        type: Boolean,
        default: false,
    },
    tags_author_role: {
        type: String,
        default: '',
    },
    tags_list: {
        type: Object,
        default: [],
    },
    leveling_enabled: {
        type: Boolean,
        default: false,
    },
    leveling_minimum: {
        type: Number,
        default: 10,
    },
    leveling_maximum: {
        type: Number,
        default: 20,
    },
    leveling_cooldown: {
        type: Number,
        default: 60,
    },
    leveling_stack_rewards: {
        type: Boolean,
        default: false,
    },
    leveling_role_rewards: {
        type: Object,
        default: [],
    },
    leveling_message: {
        type: String,
        default: '{{user}} has level up to level **{{new_level}}** from level **{{old_level}}**!'
    },
    leveling_log_channel: {
        type: String,
        default: '',
    },
    logging_enabled: {
        type: Boolean,
        default: false,
    },
    logging_channel_id: {
        type: String,
        default: '',
    },
    logging_errors: {
        type: Boolean,
        default: false,
    },
    logging_message_update: {
        type: Boolean,
        default: false,
    },
    logging_message_delete: {
        type: Boolean,
        default: false,
    },
    logging_channel_create: {
        type: Boolean,
        default: false,
    },
    logging_channel_update: {
        type: Boolean,
        default: false,
    },
    logging_channel_delete: {
        type: Boolean,
        default: false,
    },
    logging_role_create: {
        type: Boolean,
        default: false,
    },
    logging_role_update: {
        type: Boolean,
        default: false,
    },
    logging_role_delete: {
        type: Boolean,
        default: false,
    },
    logging_member_add: {
        type: Boolean,
        default: false,
    },
    logging_member_remove: {
        type: Boolean,
        default: false,
    },
    logging_member_update: {
        type: Boolean,
        default: false,
    },
    logging_member_kick: {
        type: Boolean,
        default: false,
    },
    logging_member_ban_add: {
        type: Boolean,
        default: false,
    },
    logging_member_ban_remove: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_join: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_leave: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_move: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_deafen: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_muted: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_server_deafen: {
        type: Boolean,
        default: false,
    },
    logging_member_voice_server_muted: {
        type: Boolean,
        default: false,
    },
}));

export default Guild;

export interface GuildAttributes extends mongoose.Document {

    guild_id: string;
    name: string;

    premium: boolean;
    prefix: string;

    moderator_role: string;
    administrator_role: string;
    disabled_commands: Array<string>;

    listing_enabled: boolean;
    listing_description: string;
    listing_upvotes: number;
    listing_downvotes: number;
    listing_tags: Array<string>;

    welcome_enabled: boolean;
    welcome_message: string;
    welcome_channel: string;

    farewell_enabled: boolean;
    farewell_message: string;
    farewell_channel: string;

    ticket_enabled: boolean;
    ticket_category: string;
    ticket_support_role: string;
    ticket_reaction_channel: string;
    ticket_log_channel: string;
    moderation_enabled: boolean;
    moderation_cases: Array<Case>;
    moderation_log_channel: string;

    moderation_warning_enabled: boolean;
    moderation_warning_thresholds: WarningThreshold[];

    moderation_banned_words_enabled: boolean;
    moderation_banned_words: Array<string>;

    moderation_whitelisted_words: Array<string>;
    moderation_whitelisted_links: Array<string>;

    moderation_filter_links: boolean;
    moderation_filter_invite: boolean;
    moderation_filter_caps: boolean;
    moderation_filter_swear: boolean;

    tags_enabled: boolean;
    tags_author_role: string;
    tags_list: Tag[];

    leveling_enabled: boolean;
    leveling_minimum: number;
    leveling_maximum: number;
    leveling_cooldown: number;
    leveling_stack_rewards: boolean;
    leveling_role_rewards: GuildRoleRewards;
    leveling_message: string;
    leveling_log_channel: string;

    logging_enabled: boolean;
    logging_channel_id: string;
    logging_errors: boolean;
    logging_message_update: boolean;
    logging_message_delete: boolean;
    logging_channel_create: boolean;
    logging_channel_update: boolean;
    logging_channel_delete: boolean;
    logging_role_create: boolean;
    logging_role_update: boolean;
    logging_role_delete: boolean;
    logging_member_add: boolean;
    logging_member_remove: boolean;
    logging_member_update: boolean;
    logging_member_kick: boolean;
    logging_member_ban_add: boolean;
    logging_member_ban_remove: boolean;
    logging_member_voice_join: boolean;
    logging_member_voice_leave: boolean;
    logging_member_voice_move: boolean;
    logging_member_voice_deafen: boolean;
    logging_member_voice_muted: boolean;
    logging_member_voice_server_deafen: boolean;
    logging_member_voice_server_muted: boolean;

}


export type GuildRoleRewards = RoleReward[];

export interface RoleReward {
    id: string;
    level: number;
};

export interface Case {
    type: string;
    member_id: string;
    moderator_id: string;
    reason: string;
}

export interface WarningThreshold {
    action: string;
    threshold: number;
}

export interface Tag {
    name: string;
    value: string;
    aliases: Array<string>;
    author: string;
};

// public async addTag(tag: GuildTag) {
//     if (!this.data.tags.enabled) return false;
//     const collision = this.data.tags.list.find((t) => {
//         return t.name === tag.name ||
//             t.aliases.includes(tag.name) ||
//             tag.aliases.includes(t.name) ||
//             !!t.aliases.find((c) => {
//                 for (const tt of tag.aliases) if (c === tt) return true;
//                 return false;
//             });
//     });
//     if (collision) return false;
//     this.data.tags.list.push(tag);
//     return tag;
// }

// public resolveTag(name: string) {
//     return this.data.tags.list.find((c) => c.name === name || c.aliases.includes(name));
// }

// public async removeTag(name: string) {
//     const tag = this.resolveTag(name);
//     if (!tag) return false;
//     this.data.tags.list = this.data.tags.list.filter((t) => t.name !== tag.name);
//     return tag;
// }

// public async addTagAlias(name: string, alias: string) {
//     const tag = this.resolveTag(name);
//     const collision = this.resolveTag(alias);
//     if (!tag || collision) return false;
//     tag.aliases.push(alias);
//     return tag;
// }

// public async removeTagAlias(name: string, alias: string) {
//     const tag = this.resolveTag(name);
//     const aliasCheck = this.resolveTag(alias);
//     if (!tag || !aliasCheck) return false;
//     tag.aliases = tag.aliases.filter((a) => a !== alias);
//     return tag;
// }