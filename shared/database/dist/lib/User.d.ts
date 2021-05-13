import mongoose from 'mongoose';
export declare const User: mongoose.Model<UserAttributes, {}, {}>;
export interface UserAttributes extends mongoose.Document {
    user_id: string;
    username: string;
    discriminator: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
}
//# sourceMappingURL=User.d.ts.map