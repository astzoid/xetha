"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = exports.development = exports.production = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.NODE_ENV =
    process.platform === 'linux' ? 'production' : 'development';
function throwError(property) {
    console.error(new Error(`Environment Variable '${property}' was not specified.`));
    process.exit(1);
}
exports.production = process.env.NODE_ENV === 'production';
exports.development = process.env.NODE_ENV === 'development';
exports.environment = {
    API_SECRET: process.env.API_SECRET ?? 'We are currently in Development',
    CLIENT_ID: process.env.CLIENT_ID ?? throwError('CLIENT_ID'),
    CLIENT_SECRET: process.env.CLIENT_SECRET ?? throwError('CLIENT_SECRET'),
    DISCORD_TOKEN: process.env.DISCORD_TOKEN ?? throwError('DISCORD_TOKEN'),
    JWT_SECRET: process.env.JWT_SECRET ?? 'We are currently in Development',
    WEBSITE_URL: process.env.WEBSITE_URL ?? 'http://localhost:3000',
    REDIRECT_URI: process.env.REDIRECT_URI ?? 'http://localhost:3001/api/redirect',
};
//# sourceMappingURL=index.js.map