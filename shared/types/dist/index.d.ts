export interface GuildSettings {
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
    moderation_warning_thresholds: Array<WarningThreshold>;
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
    leveling_role_rewards: Array<RoleReward>;
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
export interface RoleReward {
    id: string;
    level: number;
}
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
}
export interface Channel {
    id: string;
    name: string;
    type: string;
    parent: string;
}
export interface Role {
    id: string;
    name: string;
    color: string | null;
}
export interface Blacklisted {
    message: string;
    reason?: string;
    issued_by?: string;
    issued_at?: number;
}
export interface Profile {
    premium: boolean;
    public: string;
    description: string;
    bot_moderator: boolean;
    balance: number;
    experience: number;
    inventory: InventoryItem[];
}
export interface InventoryItem {
    id: string;
    amount: number;
}
export interface MemberData {
    experience: number;
}
//# sourceMappingURL=index.d.ts.map
