import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV =
    process.platform === 'linux' ? 'production' : 'development';

function throwError(property: string) {
    console.error(
        new Error(`Environment Variable '${property}' was not specified.`),
    );
    process.exit(1);
}

export const production = process.env.NODE_ENV === 'production';
export const development = process.env.NODE_ENV === 'development';

export const environment = {
    API_SECRET: process.env.API_SECRET ?? 'We are currently in Development',
    CLIENT_ID: process.env.CLIENT_ID ?? throwError('CLIENT_ID'),
    CLIENT_SECRET: process.env.CLIENT_SECRET ?? throwError('CLIENT_SECRET'),
    DISCORD_TOKEN: process.env.DISCORD_TOKEN ?? throwError('DISCORD_TOKEN'),
    JWT_SECRET: process.env.JWT_SECRET ?? 'We are currently in Development',
    WEBSITE_URL: process.env.WEBSITE_URL ?? 'http://localhost:3000',
    REDIRECT_URI:
        process.env.REDIRECT_URI ?? 'http://localhost:3001/api/redirect',
};
