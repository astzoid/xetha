import mongoose from 'mongoose';
import { encrypt, decrypt } from './aes';

export const User = mongoose.model<UserAttributes>(
    'user',
    new mongoose.Schema<UserAttributes>(
        {
            user_id: {
                type: String,
                required: true,
                unique: true,
            },
            username: {
                type: String,
                required: true,
            },
            discriminator: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
            accessToken: {
                type: String,
                required: true,
                set: encrypt,
                get: decrypt,
            },
            refreshToken: {
                type: String,
                required: true,
                set: encrypt,
                get: decrypt,
            },
        },
        {
            toJSON: {
                getters: true,
            },
        },
    ),
);

export interface UserAttributes extends mongoose.Document {
    user_id: string;
    username: string;
    discriminator: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
}
