import mongoose from 'mongoose';
export declare const Profile: mongoose.Model<ProfileAttributes, {}, {}>;
export interface ProfileAttributes extends mongoose.Document {
    user_id: string;
    tag: string;
    premium: boolean;
    public: string;
    description: string;
    bot_moderator: boolean;
    balance: number;
    experience: number;
    inventory: InventoryItem[];
}
export interface InventoryItem {
    id: string;
    amount: number;
}
//# sourceMappingURL=Profile.d.ts.map