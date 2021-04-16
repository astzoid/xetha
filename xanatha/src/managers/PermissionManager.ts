import Manager from '../structures/Manager';
import { Message } from 'discord.js';
import { GuildAttributes } from '../database/models/Guild';
import { ProfileAttributes } from '../database/models/Profile';
import { Disclosure } from 'disclosure-discord';

export const Levels: Level[] = [
    {
        name: 'User',
        level: 1,
        check: () => true,
    },
    {
        name: 'Server Moderator',
        level: 2,
        check: (_client: Disclosure, message: Message, guild: GuildAttributes) => {
            return guild && message.member.roles.cache.has(guild.moderator_role);
        }
    },
    {
        name: 'Server Administrator',
        level: 3,
        check: (_client: Disclosure, message: Message, guild: GuildAttributes) => {
            return guild && message.member.roles.cache.has(guild.administrator_role);
        }
    },
    {
        name: 'Server Owner',
        level: 4,
        check: (_client: Disclosure, message: Message, guild: GuildAttributes) => {
            return guild && message.author.id === message.guild.ownerID;
        }
    },
    {
        name: 'Bot Moderator',
        level: 8,
        check: (_client: Disclosure, _message: Message, _guild: GuildAttributes, profile: ProfileAttributes) => {
            return profile.bot_moderator;
        },
    },
    {
        name: 'Bot Owner',
        level: 10,
        check: (client: Disclosure, message: Message) => {
            return client.config.ownerID.includes(message.author.id);
        },
    }
];

export default class PermissionManager extends Manager<Level> {

    constructor(client: Disclosure) {
        super(client);

        this.levels = [];

        for (const l of Levels) {
            this.cache.set(l.name, l);
            this.levels[l.level] = l.name;
        }
    }

    levels: string[];

    level(message: Message, guild: GuildAttributes, profile: ProfileAttributes): number {

        let num = 0;

        for (const level of Levels) {
            num = level.check(this.client, message, guild, profile) ? level.level : num;
        }

        return num;

    }

}

export type RolePermission = 'User' | 'Server Moderator' | 'Server Administrator' | 'Server Owner' | 'Bot Moderator' | 'Bot Owner';

export interface Level {
    name: RolePermission;
    level: number;
    check: (client: Disclosure, message: Message, guild: GuildAttributes, profile: ProfileAttributes) => boolean;
}