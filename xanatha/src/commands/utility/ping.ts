import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'ping',
            description: 'Ping ping pong pong boomboom',
            cooldown: 5,
            args: 0,
            usage: ['ping'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const msg = await message.channel.send(`Ping?`);

        await msg.edit(
            `Pong!\nLatency: \`${Math.round(
                msg.createdTimestamp - message.createdTimestamp,
            )}ms\`\nWebSocket API Latency :\`${Math.round(
                this.client.ws.ping,
            )}ms\``,
        );
    }
}
