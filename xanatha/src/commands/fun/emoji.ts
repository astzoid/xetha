import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message } from 'discord.js';

const emojis = [
    '( ͡° ͜ʖ ͡°)', '¯\\_(ツ)_/¯', 'ʕ•ᴥ•ʔ', '(▀̿Ĺ̯▀̿ ̿)', '(ง ͠° ͟ل͜ ͡°)ง',
    'ಠ_ಠ', "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿", '[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]', "﴾͡๏̯͡๏﴿ O'RLY?",
    '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]', '(ᵔᴥᵔ)', '(¬‿¬)', '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)', '(づ￣ ³￣)づ',
    'ლ(ಠ益ಠლ)', 'ಠ╭╮ಠ', '♪~ ᕕ(ᐛ)ᕗ', 'ヾ(⌐■_■)ノ♪', '◉_◉', '\\ (•◡•) /',
    '༼ʘ̚ل͜ʘ̚༽', '┬┴┬┴┤(･_├┬┴┬┴', 'ᕦ(ò_óˇ)ᕤ', '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
    '（╯°□°）╯︵( .o.)', 'ಠ‿↼', '◔ ⌣ ◔', '(ノಠ益ಠ)ノ彡┻━┻',
    '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)', "̿ ̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿", '(;´༎ຶД༎ຶ`)', '♥‿♥',
    'ᕦ(ò_óˇ)ᕤ', '(•_•) ( •_•)>⌐■-■ (⌐■_■)', '⌐╦╦═─ ಠ_ಠ , (¬‿¬)',
    '˙ ͜ʟ˙', ":')", '(°ロ°)☝', 'ಠ⌣ಠ', '(；一_一)', '( ⚆ _ ⚆ )',
    '☜(⌒▽⌒)☞', "(ʘᗩʘ')", '¯\\(°_o)/¯', 'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ',
    '(ʘ‿ʘ)', 'ಠ~ಠ', 'ಠ_ಥ', 'ಠ‿↼', '(>ლ)', '(ღ˘⌣˘ღ)',
    'ಠoಠ', 'ರ_ರ', '◔ ⌣ ◔', '(✿´‿`)', 'ب_ب', '┬─┬﻿ ︵ /(.□. ）',
    '☼.☼', '^̮^', '(>人<)', '>_>', '(/) (°,,°) (/)', '(･.◤)', '=U',
    '~(˘▾˘~)', '| (• ◡•)| (❍ᴥ❍ʋ)',
];

export default class extends Command {
    constructor(client: Disclosure)  {
        super(client, {
            name: 'emoji',
            description: 'Sends a random ASCII emoji',
            cooldown: 3,
            args: 0,
            usage: ['emoji'],
            aliases: [],
            userPermissions: [],
            clientPermissions: [],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        message.channel.send(emojis[Math.floor(Math.random() * emojis.length)]);
    }

}