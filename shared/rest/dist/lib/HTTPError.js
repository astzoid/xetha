"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
class HTTPError extends Error {
    code;
    method;
    path;
    constructor(message, name, code, method, path) {
        super(message);
        this.name = name;
        this.code = code || 500;
        this.method = method;
        this.path = path;
    }
}
exports.HTTPError = HTTPError;
//# sourceMappingURL=HTTPError.js.map