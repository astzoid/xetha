import mongoose from 'mongoose';

const Member = mongoose.model<MemberAttributes>('member', new mongoose.Schema<MemberAttributes>({
    guild_id: {
        type: String,
        required: true,
    },
    member_id: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        default: 0,
    },
}));

export default Member;

export interface MemberAttributes extends mongoose.Document {
    guild_id: string;
    member_id: string;
    tag: string;
    experience: number;
}