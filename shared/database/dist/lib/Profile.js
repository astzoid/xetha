"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
exports.Profile = mongoose_1.default.model('profile', new mongoose_1.default.Schema({
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
//# sourceMappingURL=Profile.js.map