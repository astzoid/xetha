import mongoose from 'mongoose';

const Schema = new mongoose.Schema<BlacklistedAttributes>({
    target_id: {
        type: String,
        required: true,
        unique: true,
    },
    reason: {
        type: String,
        required: true,
    },
    moderator: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        default: Date.now,
    },
});

const BlacklistedServer = mongoose.model<BlacklistedAttributes>('blacklisted_server', Schema);
const BlacklistedUser = mongoose.model<BlacklistedAttributes>('blacklisted_user', Schema);

export { BlacklistedServer, BlacklistedUser };

export interface BlacklistedAttributes extends mongoose.Document {
    target_id: string;
    reason: string;
    moderator: string;
    date: number,
}