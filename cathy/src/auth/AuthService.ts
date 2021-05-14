import AsyncWrapper from '@oadpoaw/async-wrapper';
import querystring from 'querystring';
import { Router } from 'express';
import { User } from '@shared/database';
import { signAccessToken, signRefreshToken } from '../functions/JWTService';
import { Config } from '../utils/Constants';
import OAuth from './OAuth';

const AuthService = Router();

AuthService.get('/login', (_req, res) => {
    res.redirect(
        OAuth.generateAuthUrl({
            scope: ['identify', 'guilds'],
            prompt: 'none',
        }),
    );
});

AuthService.get(
    '/redirect',
    AsyncWrapper(async (req, res) => {
        if (typeof req.query.code === 'string') {
            const { access_token, refresh_token } = await OAuth.tokenRequest({
                code: req.query.code,
                grantType: 'authorization_code',
                scope: ['identify', 'guilds'],
            });

            const user = await OAuth.getUser(access_token);

            const accessToken = signAccessToken(user.id);
            const refreshToken = signRefreshToken(user.id);

            const user_data = {
                user_id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                avatar: user.avatar ?? '',
                accessToken: access_token,
                refreshToken: refresh_token,
            };

            const state = await User.findOne({ user_id: user.id });
            if (state) await User.updateOne({ user_id: user.id }, user_data);
            else await User.create(user_data);

            res.redirect(
                `${Config.dashboardURL}/?${querystring.stringify({
                    accessToken,
                    refreshToken,
                })}`,
            );
        } else {
            res.status(400).json({ message: 'Missing code in request.' });
        }
    }),
);

export default AuthService;
