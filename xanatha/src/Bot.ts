import { Disclosure } from 'disclosure-discord';
import processor from '@oadpoaw/processor';

import './database/database';

import BlacklistManager from './managers/BlacklistManager';
import GuildManager from './managers/GuildManager';
import MemberManager from './managers/MemberManager';
import PermissionManager, {
    RolePermission,
} from './managers/PermissionManager';
import ProfileManager from './managers/ProfileManager';
import { Config } from './utils/Constants';
import Logger from './utils/Logger';

const client = new Disclosure(process.env.MONGODB_URI, {}, Logger);

processor(client.logger);

client.managers = {
    blacklist: new BlacklistManager(client),
    guilds: new GuildManager(client),
    members: new MemberManager(client),
    permissions: new PermissionManager(client),
    profiles: new ProfileManager(client),
};

client.xetha = Config;

client.init = async function init() {
    await this.managers.blacklist.synchronize();
    return this;
};

client.dispatcher.generators.prefix = async (message) => {
    let { prefix } = client.config;

    if (message.guild) {
        prefix = (
            await client.managers.guilds.fetch(
                message.guild.id,
                message.guild.name,
            )
        ).prefix;
    }

    if (typeof prefix !== 'string') prefix = client.config.prefix;

    return prefix;
};

client.dispatcher.beforeExecute = (message) => {
    if (message.guild && client.managers.blacklist.getServer(message.guild.id))
        return false;

    if (client.managers.blacklist.getUser(message.author.id)) return false;

    return true;
};

client.dispatcher.addInhibitor(async (message, command) => {
    const guild = message.guild
        ? await client.managers.guilds.fetch(
              message.guild.id,
              message.guild.name,
          )
        : null;
    const profile = await client.managers.profiles.fetch(
        message.author.id,
        message.author.tag,
    );

    if (guild) {
        const permission = client.managers.permissions.cache.get(
            command.config.permission ?? 'Bot Owner',
        );

        if (
            permission &&
            client.managers.permissions.level(message, guild, profile) <
                permission.level
        ) {
            await message.channel.send(
                `<:no:800415449488556053> You do not have permission to use this command.\nYour permission level is \`${
                    client.managers.permissions.levels[
                        client.managers.permissions.level(
                            message,
                            guild,
                            profile,
                        )
                    ]
                }\`\nThis command requires \`${command.config.permission}\``,
            );
            return false;
        }
    }
    return true;
}, 2);

client
    .init()
    .then(() => client.initialize())
    .then(() => client.login())
    .catch((err) => {
        client.logger.error(err);
        process.exit(1);
    });

declare module 'disclosure-discord/dist/src/Disclosure' {
    export interface Disclosure {
        managers: {
            blacklist: BlacklistManager;
            guilds: GuildManager;
            members: MemberManager;
            permissions: PermissionManager;
            profiles: ProfileManager;
        };
        xetha: typeof Config;
        init: () => Promise<this>;
    }
}

declare module 'disclosure-discord/dist/src/Typings' {
    export interface CommandConfig {
        permission: RolePermission;
    }
}
