import mongoose from 'mongoose';
export declare const Member: mongoose.Model<MemberAttributes, {}, {}>;
export interface MemberAttributes extends mongoose.Document {
    guild_id: string;
    member_id: string;
    tag: string;
    experience: number;
}
//# sourceMappingURL=Member.d.ts.map
