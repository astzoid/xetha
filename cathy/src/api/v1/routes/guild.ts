import AsyncWrapper, { HTTPError } from '@xetha/async-wrapper';
import { Router } from 'express';
import Manager, { Guild, Member } from '../../../functions/Manager';
import Sanitize from '../../../functions/Sanitize';

const guild = Router();

guild.get(
  '/:guild_id',
  AsyncWrapper(async (req, res) => {
    const guild_id = req.params.guild_id as string;
    const guild = await Manager.guild(guild_id);

    if (guild instanceof Guild) {
      const member = await Manager.member(guild_id, req.user.user_id);
      if (member instanceof Member) {
        if (member.dashboard) {
          res.status(200).json(guild.toJSON());
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

guild.post(
  '/:guild_id',
  AsyncWrapper(async (req, res, next) => {
    const guild_id = req.params.guild_id as string;
    const guild = await Manager.guild(guild_id);

    if (guild instanceof Guild) {
      const member = await Manager.member(guild_id, req.user.user_id);

      if (member instanceof Member) {
        if (member.dashboard) {
          try {
            const response = await Manager.updateGuild(
              guild_id,
              Sanitize(guild, req.body),
            );

            res.status(200).json(response.body);
          } catch (err) {
            if (err instanceof Error) {
              return res.status(400).json({ message: err.message });
            }

            next(new HTTPError(err.message, req, 500));
          }
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

export default guild;
