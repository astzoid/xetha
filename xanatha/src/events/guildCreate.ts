import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { Guild, TextChannel, Webhook, MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';

export default class extends DiscordEvent {
    public constructor(client: Disclosure) {
        super(client, 'guildCreate');
    }

    public async exec(guild: Guild) {
        if (
            this.client.managers.blacklist.getServer(guild.id) ||
            this.client.managers.blacklist.getUser(guild.ownerID)
        )
            return guild.leave();

        const channel = (await this.client.channels.fetch(
            this.client.xetha.channels.guildCreate,
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
            .setColor(Colors.lime)
            .setTimestamp()
            .setTitle(`${guild.name} / ${guild.id}`)
            .setImage(guild.splashURL() ?? '')
            .setThumbnail(
                guild.iconURL({ dynamic: true }) ??
                    `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(
                        guild.nameAcronym,
                    )}`,
            )
            .addField('Created At', guild.createdAt.toUTCString())
            .addField('Region', guild.region.toUpperCase(), true)
            .addField('Members', guild.memberCount, true)
            .addField('Emojis', guild.emojis.cache.size, true)
            .addField(
                'Channel Categories',
                guild.channels.cache.filter(
                    (channel) => channel.type === 'category',
                ).size,
                true,
            )
            .addField(
                'Text Channels',
                guild.channels.cache.filter(
                    (channel) => channel.type === 'text',
                ).size,
                true,
            )
            .addField(
                'Voice Channels',
                guild.channels.cache.filter(
                    (channel) => channel.type === 'voice',
                ).size,
                true,
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

        if (owner)
            embed.setAuthor(
                `${owner.tag} / ${owner.id}`,
                owner.displayAvatarURL({ dynamic: true }),
            );

        if (guild.features.length) {
            embed.addField(
                `Features`,
                `\`\`\`html\n<${guild.features.join('> <')}>\n\`\`\``,
            );
        }

        return webhook ? webhook.send(embed) : channel.send(embed);
    }
}
