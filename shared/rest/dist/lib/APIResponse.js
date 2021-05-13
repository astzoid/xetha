"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIResponse = void 0;
class APIResponse {
    status;
    method;
    options;
    headers;
    body;
    constructor(res, method, options, body) {
        this.status = res.status;
        this.method = method;
        this.options = options;
        this.headers = res.headers;
        this.body = body;
    }
}
exports.APIResponse = APIResponse;
//# sourceMappingURL=APIResponse.js.map