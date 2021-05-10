import { RequestHandler, APIError, APIResponse } from '@shared/rest';
import type { Blacklisted, GuildSettings, MemberData } from '@shared/types';
import type { Channel, Role } from 'discord.js';
import type { Profile } from 'passport';
import Serialize from './Serialize';

const REST = new RequestHandler('http://localhost:3002');

const Manager = {
    async guild(guild_id: string): Promise<Guild | Blacklisted> {
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

        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw response;
    },

    updateGuild(guild_id: string, data: any) {
        return REST.request('POST', { route: `/api/guild/${guild_id}`, data });
    },

    async member(
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

        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw response;
    },

    updateMember(guild_id: string, member_id: string, data: any) {
        return REST.request('POST', {
            route: `/api/member/${guild_id}/${member_id}`,
            data,
        });
    },

    async user(user_id: string): Promise<User | Blacklisted> {
        const response = await REST.request<User>('GET', {
            route: `/api/user/${user_id}`,
        })
            .then((res) => res)
            .catch((err: APIError) => err);

        if (response instanceof APIResponse) {
            response.body.data = Serialize(response.body.data, [
                'user_id',
                'tag',
            ]);

            return new User(response.body);
        }

        if (response instanceof APIError) {
            return response.data;
        }

        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw response;
    },

    async updateUser(user_id: string, data: any) {
        return REST.request('POST', { route: `/api/user/${user_id}`, data });
    },
};

export default Manager;

export class Guild {
    public id: string;
    public name: string;
    public iconURL: string;
    public settings: GuildSettings;
    public channels: Channel[];
    public roles: Role[];

    public constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.iconURL = data.iconURL;
        this.settings = data.settings;
        this.channels = data.channels;
        this.roles = data.roles;
    }

    public toJSON() {
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
    public guild_id: string;
    public member_id: string;
    public tag: string;
    public avatarURL: string;
    public dashboard: boolean;
    public data: MemberData;

    public constructor(data: any) {
        this.guild_id = data.guild_id;
        this.member_id = data.member_id;
        this.tag = data.tag;
        this.avatarURL = data.avatarURL;
        this.dashboard = data.dashboard;
        this.data = data.data;
    }

    public toJSON() {
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
    public id: string;
    public tag: string;
    public username: string;
    public discriminator: string;
    public avatarURL: string;
    public data: Profile;

    public constructor(data: any) {
        this.id = data.id;
        this.tag = data.tag;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatarURL = data.avatarURL;
        this.data = data.data;
    }

    public toJSON() {
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
