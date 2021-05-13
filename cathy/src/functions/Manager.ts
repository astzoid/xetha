import { APIError, APIResponse, HTTPError } from '@shared/rest';
import { Guild, Member, Profile } from '@shared/database';
import REST from './REST';
import { getBlacklistedServer, getBlacklistedUser } from './Blacklist';
import Serialize from './Serialize';
import type {
    DiscordGuild,
    DiscordGuildMember,
    DiscordUser,
} from '@shared/types';
import type {
    BlacklistedAttributes,
    GuildAttributes,
    MemberAttributes,
    ProfileAttributes,
} from '@shared/database';

interface ReturnData<T> {
    blacklisted: BlacklistedAttributes | null;
    data: T | null;
}

const Manager = {
    async user(user_id: string): Promise<
        ReturnData<{
            user: DiscordUser | null;
            data: Omit<ProfileAttributes, 'user_id' | 'tag'> | null;
        }>
    > {
        const blacklisted = await getBlacklistedUser(user_id);
        const response = await REST.get<DiscordUser>({
            route: `/api/user/${user_id}`,
        }).catch((err: APIError | HTTPError) => err);

        if (response instanceof APIResponse) {
            let data;
            if (!blacklisted) {
                data = await Profile.findOne({ user_id });
                if (!data)
                    data = new Profile({
                        user_id,
                        tag: `${response.body.username}#${response.body.discriminator}`,
                    });
            }
            if (!data)
                data = {
                    toJSON: () => {
                        return {};
                    },
                };

            return {
                blacklisted,
                data: {
                    user: response.body,
                    data: Serialize(data.toJSON(), ['user_id', 'tag']),
                },
            };
        }

        if (response instanceof APIError && response.httpStatus === 404)
            return {
                blacklisted,
                data: null,
            };

        throw response;
    },

    async guild(guild_id: string): Promise<
        ReturnData<{
            guild: DiscordGuild;
            data: Omit<GuildAttributes, 'guild_id' | 'name'>;
        }>
    > {
        const blacklisted = await getBlacklistedServer(guild_id);
        if (blacklisted)
            return {
                blacklisted,
                data: null,
            };

        const response = await REST.get<DiscordGuild>({
            route: `/api/guild/${guild_id}`,
        }).catch((err: APIError | HTTPError) => err);

        if (response instanceof APIResponse) {
            let data = await Guild.findOne({ guild_id });
            if (!data)
                data = await Guild.create({
                    guild_id,
                    name: response.body.name,
                });

            return {
                blacklisted: null,
                data: {
                    guild: response.body,
                    data: Serialize(data.toJSON(), ['guild_id', 'name']),
                },
            };
        }

        if (response instanceof APIError && response.httpStatus === 404)
            return {
                blacklisted: null,
                data: null,
            };

        throw response;
    },

    async member(
        guild_id: string,
        member_id: string,
    ): Promise<
        ReturnData<{
            member: DiscordGuildMember;
            data: Omit<MemberAttributes, 'guild_id' | 'member_id' | 'tag'>;
        }>
    > {
        const blacklisted = await getBlacklistedUser(member_id);
        if (blacklisted)
            return {
                blacklisted,
                data: null,
            };

        const response = await REST.get<DiscordGuildMember>({
            route: `/api/member/${guild_id}/${member_id}`,
        }).catch((err: APIError | HTTPError) => err);

        if (response instanceof APIResponse) {
            let data = await Member.findOne({ guild_id, member_id });
            if (!data)
                data = await Member.create({
                    guild_id,
                    member_id,
                    tag: `${response.body.username}#${response.body.discriminator}`,
                });

            return {
                blacklisted: null,
                data: {
                    member: response.body,
                    data: Serialize(data.toJSON(), [
                        'guild_id',
                        'member_id',
                        'tag',
                    ]),
                },
            };
        }

        if (response instanceof APIError && response.httpStatus === 404)
            return {
                blacklisted: null,
                data: null,
            };

        throw response;
    },
};

export default Manager;
