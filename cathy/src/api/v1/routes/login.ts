import { Router } from 'express';
import passport from 'passport';
import { Redirects } from '../../../utils/Constants';

const login = Router();

login.get(
    '/',
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect(Redirects.authenticated);
        }

        next();
    },
    passport.authenticate('discord', {
        failureRedirect: Redirects.failureRedirect,
        prompt: 'none',
    }),
);

export default login;
