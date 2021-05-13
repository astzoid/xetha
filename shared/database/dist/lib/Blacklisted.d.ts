import mongoose from 'mongoose';
declare const BlacklistedServer: mongoose.Model<BlacklistedAttributes, {}, {}>;
declare const BlacklistedUser: mongoose.Model<BlacklistedAttributes, {}, {}>;
export { BlacklistedServer, BlacklistedUser };
export interface BlacklistedAttributes extends mongoose.Document {
    target_id: string;
    reason: string;
    moderator: string;
    date: number;
}
//# sourceMappingURL=Blacklisted.d.ts.map