import { Config } from '../utils/Constants';
import passport from 'passport';
import { Strategy } from 'passport-discord';
import { Permissions } from 'discord.js';

passport.serializeUser((user: any, done) => done(null, user));

passport.deserializeUser((user: any, done) => done(null, user));

passport.use(new Strategy({
    clientID: Config.clientID,
    clientSecret: Config.clientSecret,
    callbackURL: Config.callbackURL,
    scope: ['identify', 'guilds'],
}, (_accessToken, _refreshToken, profile, done) => {
    process.nextTick(() => {
        done(null, {
            user_id: profile.id,
            username: profile.username,
            discriminator: profile.discriminator,
            tag: `${profile.username}#${profile.discriminator}`,
            avatar: profile.avatar,
            guilds: profile.guilds.filter((guild) => new Permissions(guild.permissions).has('ADMINISTRATOR')),
        });
    });
}));