import APIError from '../rest/APIError';
import APIResponse from '../rest/APIResponse';
import REST from '../rest/RequestHandler';
import Serialize from './Serialize';

export default class Manager {
  static async guild(guild_id: string): Promise<Guild | Blacklisted> {
    const response = await REST.request<Guild>('GET', {
      route: `/api/guild/${guild_id}`,
    })
      .then((res) => res)
      .catch((err: APIError) => err);

    if (response instanceof APIResponse) {
      response.body.settings = Serialize(response.body.settings, [
        'guild_id',
        'name',
      ]);

      return new Guild(response.body);
    }

    if (response instanceof APIError) {
      return response.data;
    }

    throw response;
  }

  static updateGuild(guild_id: string, data: any) {
    return REST.request('POST', { route: `/api/guild/${guild_id}`, data });
  }

  static async member(
    guild_id: string,
    member_id: string,
  ): Promise<Member | Blacklisted> {
    const response = await REST.request<Member>('GET', {
      route: `/api/member/${guild_id}/${member_id}`,
    })
      .then((res) => res)
      .catch((err: APIError) => err);

    if (response instanceof APIResponse) {
      response.body.data = Serialize(response.body.data, [
        'guild_id',
        'member_id',
        'tag',
      ]);

      return new Member(response.body);
    }

    if (response instanceof APIError) {
      return response.data;
    }

    throw response;
  }

  static updateMember(guild_id: string, member_id: string, data: any) {
    return REST.request('POST', {
      route: `/api/member/${guild_id}/${member_id}`,
      data,
    });
  }

  static async user(user_id: string): Promise<User | Blacklisted> {
    const response = await REST.request<User>('GET', {
      route: `/api/user/${user_id}`,
    })
      .then((res) => res)
      .catch((err: APIError) => err);

    if (response instanceof APIResponse) {
      response.body.data = Serialize(response.body.data, ['user_id', 'tag']);

      return new User(response.body);
    }

    if (response instanceof APIError) {
      return response.data;
    }

    throw response;
  }

  static async updateUser(user_id: string, data: any) {
    return REST.request('POST', { route: `/api/user/${user_id}`, data });
  }
}

export class Guild {
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.iconURL = data.iconURL;
    this.settings = data.settings;
    this.channels = data.channels;
    this.roles = data.roles;
  }

  id: string;
  name: string;
  iconURL: string;
  settings: GuildSettings;
  channels: Channel[];
  roles: Role[];

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      iconURL: this.iconURL,
      settings: this.settings,
      channels: this.channels,
      roles: this.roles,
    };
  }
}

export class Member {
  constructor(data: any) {
    this.guild_id = data.guild_id;
    this.member_id = data.member_id;
    this.tag = data.tag;
    this.avatarURL = data.avatarURL;
    this.dashboard = data.dashboard;
    this.data = data.data;
  }

  guild_id: string;
  member_id: string;
  tag: string;
  avatarURL: string;
  dashboard: boolean;
  data: MemberData;

  toJSON() {
    return {
      guild_id: this.guild_id,
      member_id: this.member_id,
      tag: this.tag,
      avatarURL: this.avatarURL,
      dashboard: this.dashboard,
      data: this.data,
    };
  }
}

export class User {
  constructor(data: any) {
    this.id = data.id;
    this.tag = data.tag;
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.avatarURL = data.avatarURL;
    this.data = data.data;
  }

  id: string;
  tag: string;
  username: string;
  discriminator: string;
  avatarURL: string;
  data: Profile;

  toJSON() {
    return {
      id: this.id,
      tag: this.tag,
      username: this.username,
      discriminator: this.discriminator,
      avatarURL: this.avatarURL,
      data: this.data,
    };
  }
}

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
