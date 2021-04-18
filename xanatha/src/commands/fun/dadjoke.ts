import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';
import fetch from 'node-fetch';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'dadjoke',
            description: 'Sends a random dad joke xd d',
            cooldown: 5,
            args: 0,
            usage: ['dadjoke'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        const response = await fetch(`https://icanhazdadjoke.com/`, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'xetha discord bot',
            },
        });

        const body = await response.json();

        message.channel.send(body.joke);
    }
}
