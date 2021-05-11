import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV =
    process.platform === 'linux' ? 'production' : 'development';

export const production = process.env.NODE_ENV === 'production';
export const development = process.env.NODE_ENV === 'development';
