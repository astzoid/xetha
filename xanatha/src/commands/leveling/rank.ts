import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Member } from '@shared/database';
import HumanReadable from '@oadpoaw/human-readable';
import Handlers from '../../functions/Handlers';
import Leveling from '../../modules/Leveling';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'rank',
            description: "Shows the user's ranking in the Guild XP Leadeboard",
            cooldown: 3,
            args: 0,
            usage: ['rank [user]'],
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
        const guild = await this.client.managers.guilds.fetch(
            message.guild.id,
            message.guild.name,
        );

        if (await Handlers.levelingModule(message, guild)) return;

        let member =
            (await this.client.resolveMember(args.join(''), message.guild)) ||
            message.member;

        if (!member) member = message.member;
        if (!member) return;

        const members = (await Member.find({ guild_id: guild.guild_id })).sort(
            (a, b) => b.experience - a.experience,
        );

        const me = members.find((m) => m.member_id === member?.id);
        const position = me ? members.indexOf(me) + 1 : members.length;

        if (!me) return;

        await message.channel.send(
            new MessageEmbed()
                .setAuthor(
                    `${member.user.tag}'s ranking`,
                    member.user.displayAvatarURL({ dynamic: true }),
                )
                .setTimestamp()
                .setColor('RANDOM')
                .addField(`Level`, `**${Leveling.level(me)}**`, true)
                .addField(
                    `Ranking`,
                    `**${position}** / ${members.length}`,
                    true,
                )
                .addField(
                    `Experience`,
                    `**${HumanReadable(me.experience)}** ✨`,
                    true,
                )
                .addField(
                    `Progress`,
                    `[**${Leveling.progressbar(
                        me,
                    )}**](https://www.youtube.com/watch/dQw4w9WgXcQ)\n**${Math.floor(
                        Leveling.progress(me),
                    )}**% - **${Leveling.progressXP(me)}** remaining`,
                    true,
                ),
        );
    }
}
