"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const secret = process.env.JWT_SECRET ?? 'Were in development';
const key = crypto_1.default
    .createHash('sha256')
    .update(String(secret))
    .digest('base64')
    .substr(0, 32);
function encrypt(val) {
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, key.slice(0, 16));
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted.toString();
}
exports.encrypt = encrypt;
function decrypt(encrypted) {
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, key.slice(0, 16));
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
}
exports.decrypt = decrypt;
//# sourceMappingURL=aes.js.map