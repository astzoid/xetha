import type { GuildChannel } from 'discord.js';

export interface Command {
    name: string;
    description: string;
    usage: string[];
    category: string;
    aliases: string[];
}

export interface Shard {
    id: number;
    guilds: number;
    ping: number;
    uptime: number;
}

export interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
}

export interface DiscordGuild {
    id: string;
    name: string;
    icon: string | null;
    memberCount: number;
    channels: Channel[];
    roles: Role[];
}

export interface DiscordGuildMember {
    guild_id: string;
    member_id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    dashboard: boolean;
}

export interface Channel {
    id: string;
    name: string;
    type: GuildChannel['type'];
}

export interface Role {
    id: string;
    name: string;
    color: string;
}
