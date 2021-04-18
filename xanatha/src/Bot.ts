import { Disclosure } from 'disclosure-discord';
import './database/database';

import BlacklistManager from './managers/BlacklistManager';
import GuildManager from './managers/GuildManager';
import MemberManager from './managers/MemberManager';
import PermissionManager, {
    RolePermission,
} from './managers/PermissionManager';
import ProfileManager from './managers/ProfileManager';
import { Config } from './utils/Constants';

const client = new Disclosure(process.env.MONGODB_URI);

client.managers = {
    blacklist: new BlacklistManager(client),
    guilds: new GuildManager(client),
    members: new MemberManager(client),
    permissions: new PermissionManager(client),
    profiles: new ProfileManager(client),
};

client.xetha = Config;

client.init = async function () {
    await this.managers.blacklist.synchronize();

    return this;
};

client.dispatcher.generators.prefix = async (message) => {
    let prefix = client.config.prefix;

    if (message.guild) {
        prefix = (
            await client.managers.guilds.fetch(
                message.guild.id,
                message.guild.name,
            )
        ).prefix;
    }

    if (typeof prefix !== 'string') {
        prefix = client.config.prefix;
    }

    return prefix;
};

client.dispatcher.beforeExecute = (message) => {
    if (message.guild) {
        if (client.managers.blacklist.getServer(message.guild.id)) {
            return false;
        }
    }

    if (client.managers.blacklist.getUser(message.author.id)) {
        return false;
    }

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

    if (
        client.managers.permissions.level(message, guild, profile) <
        client.managers.permissions.cache.get(
            command.config.permission ?? 'Bot Owner',
        ).level
    ) {
        await message.channel.send(
            `<:no:800415449488556053> You do not have permission to use this command.\nYour permission level is \`${
                client.managers.permissions.levels[
                    client.managers.permissions.level(message, guild, profile)
                ]
            }\`\nThis command requires \`${command.config.permission}\``,
        );
        return false;
    }

    return true;
}, 2);

client
    .init()
    .then(() => client.initialize())
    .then(() => client.login());

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
