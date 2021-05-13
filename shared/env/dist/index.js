"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = exports.production = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.NODE_ENV =
    process.platform === 'linux' ? 'production' : 'development';
exports.production = process.env.NODE_ENV === 'production';
exports.development = process.env.NODE_ENV === 'development';
//# sourceMappingURL=index.js.map