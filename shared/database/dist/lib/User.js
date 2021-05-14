"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const aes_1 = require("./aes");
exports.User = mongoose_1.default.model('user', new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
        set: aes_1.encrypt,
        get: aes_1.decrypt,
    },
    refreshToken: {
        type: String,
        required: true,
        set: aes_1.encrypt,
        get: aes_1.decrypt,
    },
}, {
    toJSON: {
        getters: true,
    },
}));
//# sourceMappingURL=User.js.map