import AsyncWrapper from '@xetha/async-wrapper';
import { Router } from 'express';
import Manager, { Guild, Member } from '../../../functions/Manager';

const guild = Router();

guild.use(
  '/:guild_id',
  AsyncWrapper(async (req, res, next) => {
    const guild_id = req.params.guild_id as string;

    const [guild, member] = await Promise.all([
      Manager.guild(guild_id),
      Manager.member(guild_id, req.user.user_id),
    ]);

    if (guild instanceof Guild) {
      if (member instanceof Member) {
        if (member.dashboard) {
          next();
        } else {
          res.status(403).json({ message: 'Not Allowed' });
        }
      } else {
        res.status(member.issued_by ? 403 : 404).json(member);
      }
    } else {
      res.status(guild.issued_by ? 403 : 404).json(guild);
    }
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
