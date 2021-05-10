import { Router } from 'express';
import passport from 'passport';
import { Redirects } from '../../../utils/Constants';
import Logger from '../../../utils/Logger';

const redirect = Router();

redirect.get(
    '/',
    passport.authenticate('discord', {
        failureRedirect: Redirects.failureRedirect,
    }),
    (req, res) => {
        Logger.info(`[${req.user?.user_id as string}] authenticated`);

        res.redirect(Redirects.authenticated);
    },
);

export default redirect;
