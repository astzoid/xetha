import { Config } from '../utils/Constants';
import { Strategy } from 'passport-discord';
import passport from 'passport';

const OAuth2 = new Strategy(
    {
        clientID: Config.clientID,
        clientSecret: Config.clientSecret,
        callbackURL: Config.callbackURL,
        scope: ['identify', 'guilds'],
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            done(null, {
                accessToken,
                refreshToken,
                user_id: profile.id,
                username: profile.username,
                discriminator: profile.discriminator,
                avatar: profile.avatar,
            });
        });
    },
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
passport.use(OAuth2);
