import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import { Member } from '@shared/database';
import ArrayChunk from '@oadpoaw/array-chunk';
import HumanReadable from '@oadpoaw/human-readable';
import Handlers from '../../functions/Handlers';
import Leveling from '../../modules/Leveling';

export default class extends Command {
    public constructor(client: Disclosure) {
        super(client, {
            name: 'levels',
            description: "Shows the Guild's XP Leaderboard",
            cooldown: 3,
            args: 0,
            usage: ['levels [page]'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
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

        const members = (await Member.find({ guild_id: guild.guild_id })).sort(
            (a, b) => b.experience - a.experience,
        );

        const chunks = ArrayChunk(members, 10);

        const me = members.find((m) => m.member_id === message.author.id);
        if (!me) return;
        const position = members.indexOf(me) + 1;

        const embeds = chunks.map((ps, i) => {
            return new MessageEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setTitle(`${message.guild?.name}'s XP Leaderboard`)
                .setDescription(
                    `**${message.author.tag}**'s ranking ${position} / ${
                        members.length
                    }\n\n${ps
                        .map(
                            (p) =>
                                `**${members.indexOf(p) + 1}** ${
                                    this.client.users.cache.has(p.member_id)
                                        ? this.client.users.cache.get(
                                              p.member_id,
                                          )?.tag
                                        : p.tag
                                } - Lvl **${Leveling.level(
                                    p,
                                )}** / ${HumanReadable(p.experience)} ✨`,
                        )
                        .join('\n')}`,
                )
                .setFooter(
                    `Page ${i + 1} / ${chunks.length} | ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true }),
                );
        });

        const pageNumber =
            args[0] && args[0].length && !Number.isNaN(Number(args[0]))
                ? Number(args[0])
                : 1;
        const page =
            pageNumber > 0 && pageNumber <= chunks.length
                ? Number(pageNumber)
                : 1;

        return message.channel.send(embeds[page - 1]);
    }
}
