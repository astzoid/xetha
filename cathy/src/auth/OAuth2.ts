import passport from 'passport';
import { Strategy } from 'passport-discord';
import { Config } from '../utils/Constants';

import { User } from '@shared/database';
import Manager from '../functions/Manager';

const OAuth2 = new Strategy(
    {
        clientID: Config.clientID,
        clientSecret: Config.clientSecret,
        callbackURL: Config.callbackURL,
        scope: ['identify', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
        const data = {
            user_id: profile.id,
            username: profile.username,
            discriminator: profile.discriminator,
            avatar: profile.avatar ?? '',
            accessToken,
            refreshToken,
        };
        try {
            let user = await User.findOneAndUpdate(
                { user_id: data.user_id },
                data,
            );
            if (!user) user = await User.create(data);
            process.nextTick(() => {
                if (user) done(null, user);
                else done(new Error(`What the hell happened???`));
            });
        } catch (err) {
            done(err);
        }
    },
);

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (user_id: string, done) => {
    try {
        const user = await Manager.user(user_id);
        const data = await User.findOne({ user_id });
        if (!data) return done(null, null);
        if (!user.blacklisted && user.data && user.data.user) {
            if (data.username !== user.data.user.username)
                data.username = user.data.user.username;
            if (data.discriminator !== user.data.user.discriminator)
                data.discriminator = user.data.user.discriminator;
            if (data.avatar !== user.data.user.avatar)
                data.avatar = user.data.user.avatar ?? '';
        }
        done(null, data);
    } catch (err) {
        done(err);
    }
});

passport.use(OAuth2);
