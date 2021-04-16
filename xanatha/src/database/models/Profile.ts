import mongoose from 'mongoose';

const Profile = mongoose.model<ProfileAttributes>('profile', new mongoose.Schema<ProfileAttributes>({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    tag: {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
        default: false,
    },
    public: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: '',
    },
    bot_moderator: {
        type: Boolean,
        default: false,
    },
    balance: {
        type: Number,
        default: 0,
    },
    experience: {
        type: Number,
        default: 0,
    },
    inventory: {
        type: Object,
        default: [],
    },
}));

export default Profile;

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