import { Router } from 'express';
import type { User } from 'discord.js';
import Profile from '../../database/models/Profile';
import type { BlacklistedAttributes } from '../../database/models/Blacklisted';
import AsyncWrapper from '@oadpoaw/async-wrapper';
import type { DisclosureSharder } from 'disclosure-discord';

export default function UserRoute(manager: DisclosureSharder) {
    const route = Router();

    route.get(
        '/:user_id',
        AsyncWrapper(async (req, res) => {
            const user_id = req.params.user_id as string;
            const blacklisted = (await manager.broadcastEval(
                `this.managers.blacklist.getUser('${user_id}')`,
                0,
            )) as BlacklistedAttributes;

            if (blacklisted) {
                return res.status(403).json({
                    message: 'User is Blacklisted',
                    reason: blacklisted.reason,
                    issued_by: blacklisted.moderator,
                    issued_at: blacklisted.date,
                });
            }

            const user = (await manager.broadcastEval(
                `this.users.fetch('${user_id}').catch(() => { });`,
                0,
            )) as User;

            if (!user)
                return res.status(404).json({ message: 'User Not Found' });

            let profile = await Profile.findOne({ user_id });
            if (!profile) profile = new Profile({ user_id, tag: user.tag });

            return res.status(200).json({
                id: user.id,
                tag: user.tag,
                username: user.username,
                discriminator: user.discriminator,
                // eslint-disable-next-line @typescript-eslint/unbound-method
                avatarURL: user.displayAvatarURL,
                data: profile.toJSON(),
            });
        }),
    );

    route.post(
        '/:user_id',
        AsyncWrapper(async (req, res) => {
            const user_id = req.params.user_id as string;
            const profile = await Profile.findOne({ user_id });

            if (!profile)
                return res.status(404).json({ message: 'Profile Not Found' });

            await profile.update(req.body);

            return res.status(200).json(profile.toJSON());
        }),
    );

    return route;
}
