import { production } from '@shared/env';
import MongoStore from 'connect-mongo';
import type { CorsOptions } from 'cors';
import type { SessionOptions } from 'express-session';
import type { Options as RatelimitOptions } from 'express-rate-limit';
import rateLimitMongo from 'rate-limit-mongo';

export const Config = {
    production,
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: process.env.CALLBACK_URL as string,
    dashboardURL: process.env.DASHBOARD_URL as string,
    permissions: 1036381407,
    support: {
        invite: 'https://discord.gg/UMBem59yAm',
    },
};

export const Redirects = {
    authenticated: `${Config.dashboardURL}/dashboard`,
    unAuthenticated: (stat: boolean) =>
        `${Config.dashboardURL}/?logout=${stat}`,
    failureRedirect: `${Config.dashboardURL}/?auth_error=true`,
};

export const corsOptions: CorsOptions = {
    origin: Config.dashboardURL,
    credentials: true,
    methods: ['GET', 'POST'],
};

export const sessionOptions: SessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: Config.clientSecret,
    cookie: {
        maxAge: 86400000,
    },
    store: MongoStore.create({
        mongoUrl: `${process.env.MONGODB_URI ?? 'mongodb://localhost/xetha'}`,
        ttl: 1 * 24 * 60 * 60,
        crypto: {
            secret: Config.clientSecret,
        },
    }),
};

export const rateLimitOptions: RatelimitOptions = {
    max: 100,
    windowMs: 60000,
    store: new rateLimitMongo({
        uri: process.env.MONGODB_URI ?? 'mongodb://localhost/xetha',
        expireTimeMs: 60000,
    }),
    handler: (_req, res, _next) =>
        res.status(429).json({ message: 'You are being rate limited.' }),
};
