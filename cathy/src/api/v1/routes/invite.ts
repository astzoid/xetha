import { Router } from 'express';
import { Config, Redirects } from '../../../utils/Constants';

const invite = Router();

invite.get('/', (req, res) => {
  const guild =
    typeof req.query.guild_id === 'string' && req.isAuthenticated()
      ? `&guild_id=${req.query.guild_id}&disable_guild_select=true`
      : '';

  res.redirect(
    `https://discord.com/oauth2/authorize?client_id=${
      Config.clientID
    }&permissions=${Config.permissions}&redirect_uri=${encodeURIComponent(
      Redirects.authenticated,
    )}&response_type=code&scope=bot%20identify${guild}`,
  );
});

export default invite;
