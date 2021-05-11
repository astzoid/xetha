import Manager from '../structures/Manager';
import type { Message } from 'discord.js';
import type { GuildAttributes, ProfileAttributes } from '@shared/database';
import type { Disclosure } from 'disclosure-discord';

export const Levels: Level[] = [
    {
        name: 'User',
        level: 1,
        check: () => true,
    },
    {
        name: 'Server Moderator',
        level: 2,
        check: (
            _client: Disclosure,
            message: Message,
            guild: GuildAttributes,
        ) => {
            return Boolean(
                guild && message.member?.roles.cache.has(guild.moderator_role),
            );
        },
    },
    {
        name: 'Server Administrator',
        level: 3,
        check: (
            _client: Disclosure,
            message: Message,
            guild: GuildAttributes,
        ) => {
            return Boolean(
                guild &&
                    message.member?.roles.cache.has(guild.administrator_role),
            );
        },
    },
    {
        name: 'Server Owner',
        level: 4,
        check: (
            _client: Disclosure,
            message: Message,
            guild: GuildAttributes,
        ) => {
            return guild && message.author.id === message.guild?.ownerID;
        },
    },
    {
        name: 'Bot Moderator',
        level: 8,
        check: (
            _client: Disclosure,
            _message: Message,
            _guild: GuildAttributes,
            profile: ProfileAttributes,
        ) => {
            return profile.bot_moderator;
        },
    },
    {
        name: 'Bot Owner',
        level: 10,
        check: (client: Disclosure, message: Message) => {
            // @ts-ignore Never say never
            return client.config.ownerID.includes(message.author.id);
        },
    },
];

export default class PermissionManager extends Manager<Level> {
    public levels: string[];

    public constructor(client: Disclosure) {
        super(client);
        this.levels = [];

        for (const l of Levels) {
            this.cache.set(l.name, l);
            this.levels[l.level] = l.name;
        }
    }

    public level(
        message: Message,
        guild: GuildAttributes,
        profile: ProfileAttributes,
    ): number {
        let num = 0;

        for (const level of Levels) {
            num = level.check(this.client, message, guild, profile)
                ? level.level
                : num;
        }

        return num;
    }
}

export type RolePermission =
    | 'User'
    | 'Server Moderator'
    | 'Server Administrator'
    | 'Server Owner'
    | 'Bot Moderator'
    | 'Bot Owner';

export interface Level {
    name: RolePermission;
    level: number;
    check: (
        client: Disclosure,
        message: Message,
        guild: GuildAttributes,
        profile: ProfileAttributes,
    ) => boolean;
}
