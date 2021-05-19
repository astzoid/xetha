import { environment, production } from '@shared/env';
import type { CorsOptions } from 'cors';

export const Config = {
    production,
    clientID: environment.CLIENT_ID as string,
    clientSecret: environment.CLIENT_SECRET as string,
    redirectURI: environment.REDIRECT_URI,
    dashboardURL: environment.WEBSITE_URL,
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
    methods: ['GET'],
};
