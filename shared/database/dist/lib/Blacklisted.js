"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlacklistedUser = exports.BlacklistedServer = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
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
const BlacklistedServer = mongoose_1.default.model('blacklisted_server', Schema);
exports.BlacklistedServer = BlacklistedServer;
const BlacklistedUser = mongoose_1.default.model('blacklisted_user', Schema);
exports.BlacklistedUser = BlacklistedUser;
//# sourceMappingURL=Blacklisted.js.map