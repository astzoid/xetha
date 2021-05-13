"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
exports.Member = mongoose_1.default.model('member', new mongoose_1.default.Schema({
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
//# sourceMappingURL=Member.js.map