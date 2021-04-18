import { ClientOptions } from 'discord.js';
import fs from 'fs';
import path from 'path';

export const version = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json')).toString(),
).version;

export const DiscordClientOptions: ClientOptions = {
    partials: ['USER', 'MESSAGE', 'REACTION'],
};

export const Config = {
    website: 'https://xetha-bot.me',
    support: {
        invite: 'https://discord.gg/cb8kVAvDbq',
    },
    channels: {
        guildCreate: '830052122312704001',
        guildDelete: '830052145919164416',
        blacklistserver: '830052212931166228',
        blacklistuser: '830052212931166228',
    },
};

export const Colors = {
    white: 0xffffff,
    fuchsia: 0xff00ff,
    aqua: 0x00ffff,
    yellow: 0xffff00,
    red: 0xff0000,
    blue: 0x0000ff,
    lime: 0x00ff00,
    black: 0x000000,
    silver: 0xc0c0c0,
    gray: 0x808080,
    purple: 0x800080,
    teal: 0x008080,
    maroon: 0x800000,
    navy: 0x000080,
    green: 0x008000,
    random: 'RANDOM',
};
