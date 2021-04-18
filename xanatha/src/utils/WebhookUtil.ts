import { Disclosure } from 'disclosure-discord';
import {
    Guild,
    MessageEmbed,
    TextChannel,
    Webhook,
    Collection,
} from 'discord.js';

const WebhookCache = new Collection<string, Webhook>();

export default class WebhookUtil {
    constructor() {
        throw new Error(
            `The '${this.constructor.name}' class cannot be instantiated`,
        );
    }

    static async send(
        client: Disclosure,
        guild: Guild,
        channel_id: string,
        embed: MessageEmbed | string,
    ) {
        const channel = guild.channels.cache.get(channel_id) as TextChannel;

        if (channel && channel.type === 'text') {
            let webhook: Webhook;

            if (WebhookCache.has(channel.id)) {
                webhook = WebhookCache.get(channel.id);
            } else if (
                channel.permissionsFor(guild.me).has('MANAGE_WEBHOOKS')
            ) {
                const webhooks = await channel.fetchWebhooks();

                if (webhooks.size) {
                    webhook = webhooks.first();
                } else {
                    await channel
                        .createWebhook('Xetha', { reason: 'Logging' })
                        .catch((err) => client.logger.error(err) && null);
                }

                if (webhook) {
                    WebhookCache.set(channel.id, webhook);
                }
            }

            if (!webhook) {
                return;
            }

            if (typeof embed === 'string') {
                await webhook.send(embed, {
                    username: client.user.username,
                    avatarURL: client.user.avatarURL(),
                });
            } else {
                await webhook
                    .send(null, {
                        embeds: [embed],
                        username: client.user.username,
                        avatarURL: client.user.avatarURL(),
                    })
                    .catch((err) => client.logger.error(err));
            }
        }
    }
}
