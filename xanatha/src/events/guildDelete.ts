import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Guild, TextChannel, Webhook, MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'guildDelete');
    }

    public async exec(guild: Guild) {
        if (
            this.client.managers.blacklist.getServer(guild.id) ||
            this.client.managers.blacklist.getUser(guild.ownerID)
        )
            return;

        const channel = (await this.client.channels.fetch(
            this.client.xetha.channels.guildDelete,
        )) as TextChannel;

        const webhooks = await channel.fetchWebhooks();
        const webhook: Webhook = webhooks.size
            ? webhooks.first()
            : await channel
                  .createWebhook('Xetha', {
                      avatar: this.client.user?.avatar ?? '',
                      reason: 'Logging',
                  })
                  .catch((error) => this.client.logger.error(error) && null);

        const embed = new MessageEmbed()
            .setColor(Colors.red)
            .setTimestamp()
            .setTitle(`${guild.name} / ${guild.id}`)
            .setThumbnail(
                guild.iconURL({ dynamic: true }) ??
                    `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(
                        guild.nameAcronym,
                    )}`,
            )
            .setFooter(
                `Xetha is now at ${await this.client.getCount(
                    'guilds',
                )} guilds`,
                this.client.user?.displayAvatarURL({ dynamic: true }),
            );

        const owner = await this.client.users
            .fetch(guild.ownerID)
            .catch((err) => this.client.logger.error(err));

        if (owner) {
            embed.setAuthor(
                `${owner.tag} / ${owner.id}`,
                owner.displayAvatarURL({ dynamic: true }),
            );
        }

        if (guild.features.length) {
            embed.addField(
                `Features`,
                `\`\`\`html\n<${guild.features.join('> <')}>\n\`\`\``,
            );
        }

        webhook ? await webhook.send(embed) : await channel.send(embed);

        return this.client.managers.guilds.delete(guild.id);
    }
}
