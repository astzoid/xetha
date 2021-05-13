"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRequest = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const abort_controller_1 = tslib_1.__importDefault(require("abort-controller"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
class APIRequest {
    method;
    options;
    path;
    retries;
    rest;
    constructor(rest, method, options) {
        this.rest = rest;
        this.method = method;
        this.options = options;
        this.retries = 0;
        const query = options.query
            ? querystring_1.default.stringify(options.query)
            : null;
        this.path = `${this.rest.uri}${options.route}${query ? `?${query}` : ''}`;
    }
    make() {
        let headers = {};
        let body;
        if (this.options.headers) {
            headers = Object.assign(headers, this.options.headers);
        }
        if (this.options.data) {
            body = JSON.stringify(this.options.data);
            headers['Content-Type'] = 'application/json';
        }
        const controller = new abort_controller_1.default();
        const timeout = setTimeout(() => controller.abort(), this.rest.requestTimeout);
        return node_fetch_1.default(this.path, {
            method: this.method,
            headers,
            body,
            signal: controller.signal,
        }).finally(() => clearTimeout(timeout));
    }
}
exports.APIRequest = APIRequest;
//# sourceMappingURL=APIRequest.js.map