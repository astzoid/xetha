import AsyncWrapper from '@oadpoaw/async-wrapper';
import { Router } from 'express';
import Manager from '../../../functions/Manager';

const guild = Router();

guild.use(
    '/:guild_id',
    AsyncWrapper(async (req, res, next) => {
        const guild_id = req.params.guild_id as string;
        const [guild, member] = await Promise.all([
            Manager.guild(guild_id),
            Manager.member(guild_id, req.user?.user_id as string),
        ]);

        if (guild.blacklisted) return res.status(403).json(guild.blacklisted);
        if (member.blacklisted) return res.status(403).json(member.blacklisted);
        if (!guild.data)
            return res.status(404).json({ message: 'Guild Not Found' });
        if (!member.data || !member.data.member.dashboard)
            return res.status(403).json({ message: 'Not Allowed' });

        return next();
    }),
);

guild.get(
    '/:guild_id',
    AsyncWrapper(async (req, res) => {
        const guild_id = req.params.guild_id as string;
        const guild = await Manager.guild(guild_id);
        res.status(200).json(guild);
    }),
);

export default guild;
