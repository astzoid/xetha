import { Router } from 'express';
import type { User } from 'discord.js';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';
import type { DiscordUser } from '@shared/types';

export default function UserRoute(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/:user_id',
        AsyncWrapper(async (req, res) => {
            const user_id = req.params.user_id as string;

            const user = (await manager.broadcastEval(
                `this.users.fetch('${user_id}').catch(() => { });`,
                0,
            )) as User;

            if (!user)
                return res.status(404).json({ message: 'User Not Found' });

            const payload: DiscordUser = {
                id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                avatar: user.avatar,
            };

            return res.status(200).json(payload);
        }),
    );

    return route;
}
