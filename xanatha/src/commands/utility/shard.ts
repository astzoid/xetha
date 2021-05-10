import { Disclosure, Command, Arguments } from 'disclosure-discord';
import type { Message } from 'discord.js';

export default class extends Command {
    public constructor(client: Disclosure) {
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

    public async execute(message: Message, argv: Arguments) {
        if (!message.guild) return;

        const args = argv._;

        if (args.length) {
            return this.client.shard
                ?.broadcastEval(
                    `const guild = this.guilds.cache.get(id); guild ?? null;`,
                )
                .then((results: any[]) => {
                    const result = results.find((g) => g);

                    if (!result)
                        return message.channel.send(
                            `i couldn't find that guild, sorry :/`,
                        );

                    return message.channel.send(
                        `That server is located on shard ${result.shardID}`,
                    );
                });
        }

        return message.channel.send(
            `This server is located on shard ${message.guild.shardID}`,
        );
    }
}
