import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';

const findGuild = function (id: string) {
    const guild = this.guilds.cache.get(id);

    if (!guild) {
        return null;
    }

    return guild;
};

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'shard',
            description: 'Shows what shard your server is located on',
            cooldown: 10,
            args: 0,
            usage: ['shard [Guild ID]'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: true,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const args = argv._;

        if (args.length) {
            return await this.client.shard
                .broadcastEval(`(${findGuild}).call(this, '${args[0]}')`)
                .then((results: any[]) => {
                    const result = results.find((g) => g);

                    if (!result) {
                        return message.channel.send(
                            `i couldn't find that guild, sorry :/`,
                        );
                    }

                    message.channel.send(
                        `That server is located on shard ${result.shardID}`,
                    );
                });
        }

        message.channel.send(
            `This server is located on shard ${message.guild.shardID}`,
        );
    }
}
