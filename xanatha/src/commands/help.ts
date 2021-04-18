import { Disclosure, Command, Arguments } from 'disclosure-discord';
import { Message, MessageEmbed } from 'discord.js';
import ms from 'pretty-ms';
import { Colors } from '../utils/Constants';

export default class extends Command {
    constructor(client: Disclosure) {
        super(client, {
            name: 'help',
            description: "Shows the list of the Bot's Commands",
            cooldown: 3,
            args: 0,
            usage: ['help [command]', 'help [category]'],
            aliases: [],
            userPermissions: [],
            clientPermissions: ['EMBED_LINKS'],
            ownerOnly: false,
            guildOnly: false,
            permission: 'User',
        });
    }

    async execute(message: Message, argv: Arguments) {
        // Filter out guild only commands if not in a guild
        const commands = this.client.commands
            .filter((command) => !(!message.guild && command.config.guildOnly))
            .filter(
                (command) =>
                    !(
                        !command.config.ownerOnly &&
                        this.client.config.ownerID.includes(message.author.id)
                    ),
            );

        const name = argv._[0];

        if (name) {
            const command = this.client.resolveCommand(name.toLowerCase());

            if (command && !(!message.guild && command.config.guildOnly)) {
                const embed = new MessageEmbed()
                    .setTitle(
                        `${command.config.name.replace(
                            /(^\w{1})|(\s{1}\w{1})/g,
                            (m) => m.toUpperCase(),
                        )} Command`,
                    )
                    .setDescription(command.config.description)
                    .addField(
                        `Category`,
                        `> ${
                            command.config.category
                                ? command.config.category.replace(
                                      /(^\w{1})|(\s{1}\w{1})/g,
                                      (m) => m.toUpperCase(),
                                  )
                                : '`none`'
                        }`,
                        true,
                    )
                    .addField(
                        `Cooldown`,
                        `${ms(command.config.cooldown * 1000)}`,
                        true,
                    )
                    .addField(
                        'User Permission',
                        command.config.permission,
                        true,
                    )
                    .addField(
                        `Usage`,
                        `**${command.config.usage.join('\n')}**`,
                        false,
                    );

                if (
                    command.config.aliases &&
                    command.config.aliases.length !== 0
                ) {
                    embed.addField(
                        `Aliases`,
                        `${command.config.aliases.join(', ')}`,
                        true,
                    );
                }

                if (message.guild) {
                    if (
                        command.config.userPermissions &&
                        command.config.userPermissions.length !== 0
                    ) {
                        embed.addField(
                            `Required User Permissions`,
                            command.config.userPermissions
                                .map((name) =>
                                    name
                                        .replace(/\_/g, ' ')
                                        .replace(
                                            /(^\w{1})|(\s{1}\w{1})/g,
                                            (m) => m.toUpperCase(),
                                        ),
                                )
                                .join(', '),
                            false,
                        );
                    }
                    if (
                        command.config.clientPermissions &&
                        command.config.clientPermissions.length !== 0
                    ) {
                        embed.addField(
                            `Required Bot Permissions`,
                            command.config.clientPermissions
                                .map((name) =>
                                    name
                                        .replace(/\_/g, ' ')
                                        .replace(
                                            /(^\w{1})|(\s{1}\w{1})/g,
                                            (m) => m.toUpperCase(),
                                        ),
                                )
                                .join(', '),
                            false,
                        );
                    }
                }

                if (command.config.ownerOnly) {
                    embed.setFooter(
                        `This command is only available to the Bot Owner.`,
                    );
                }

                return message.channel.send(embed);
            } else {
                const cmds = commands.filter(
                    (cmd) =>
                        cmd.config.category &&
                        cmd.config.category === name.toLowerCase(),
                );

                if (cmds.size) {
                    return message.channel.send(
                        new MessageEmbed()
                            .setTimestamp()
                            .setTitle(
                                name.replace(/(^\w{1})|(\s{1}\w{1})/g, (m) =>
                                    m.toUpperCase(),
                                ),
                            )
                            .setDescription(
                                `${cmds
                                    .map(
                                        (command) =>
                                            `\`${command.config.name}\``,
                                    )
                                    .join(', ')}`,
                            ),
                    );
                }
            }
        }

        const [cmds, categorized] = commands.partition(
            (cmd) => !cmd.config.category,
        );

        // using Set to avoid duplicates
        const categories = [
            ...new Set(categorized.map((cmd) => cmd.config.category)),
        ];

        const prefix = await this.client.dispatcher.generators.prefix(message);

        message.channel.send(
            new MessageEmbed()
                .setTimestamp()
                .setColor(Colors.aqua)
                .setTitle('Xetha Bot')
                .setDescription(
                    `Website ${this.client.xetha.website}\nSupport Server ${this.client.xetha.support.invite}`,
                )
                .addField(
                    'Categories',
                    categories.length
                        ? categories.map((cat) => `\`${cat}\``).join(', ')
                        : '`none`',
                )
                .addField(
                    'Commands',
                    cmds
                        .map((command) => `\`${command.config.name}\``)
                        .join(', '),
                )
                .addField(`Usage`, this.config.usage.join('\n'))
                .setFooter(`Prefix: ${prefix}`),
        );
    }
}
