import session from 'express-session';
import store from 'memorystore';
import { CorsOptions } from 'cors';
import { SessionOptions } from 'express-session';
import { Options as RatelimitOptions } from 'express-rate-limit';
import { version as packageVersion } from '../../package.json';

export const version = packageVersion;

export const Config = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  dashboardURL: process.env.DASHBOARD_URL,
  permissions: 1036381407,
  support: {
    invite: 'https://discord.gg/cb8kVAvDbq',
  },
};

export const Redirects = {
  authenticated: Config.dashboardURL + '/dashboard',
  unAuthenticated: (stat: boolean) => Config.dashboardURL + `/?logout=${stat}`,
  failureRedirect: Config.dashboardURL + '/?auth_error=true',
};

export const corsOptions: CorsOptions = {
  origin: Config.dashboardURL,
  credentials: true,
};

export const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: Config.clientSecret,
  cookie: {
    maxAge: 86400000,
  },
  store: new (store(session))({
    checkPeriod: 86400000,
  }),
};

export const rateLimitOptions: RatelimitOptions = {
  max: 100,
  handler: (_req, res, _next) =>
    res.status(429).json({ message: 'You are being rate limited.' }),
};
