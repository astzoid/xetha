"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const tslib_1 = require("tslib");
const APIRequest_1 = require("./APIRequest");
const APIResponse_1 = require("./APIResponse");
const HTTPError_1 = require("./HTTPError");
const APIError_1 = require("./APIError");
const merge_1 = tslib_1.__importDefault(require("@oadpoaw/merge"));
const defaultOptions = {
    retryLimit: 1,
    requestTimeout: 15000,
};
class RequestHandler {
    uri;
    retryLimit;
    requestTimeout;
    constructor(uri, options = defaultOptions) {
        this.uri = uri;
        options = merge_1.default(defaultOptions, options);
        this.retryLimit = options.retryLimit;
        this.requestTimeout = options.requestTimeout;
    }
    request(method, options) {
        return this.execute(new APIRequest_1.APIRequest(this, method, options));
    }
    get(options) {
        return this.execute(new APIRequest_1.APIRequest(this, 'GET', options));
    }
    post(options) {
        return this.execute(new APIRequest_1.APIRequest(this, 'POST', options));
    }
    patch(options) {
        return this.execute(new APIRequest_1.APIRequest(this, 'PATCH', options));
    }
    put(options) {
        return this.execute(new APIRequest_1.APIRequest(this, 'PUT', options));
    }
    delete(options) {
        return this.execute(new APIRequest_1.APIRequest(this, 'DELETE', options));
    }
    async execute(request) {
        let res;
        try {
            res = await request.make();
        }
        catch (error) {
            if (request.retries === this.retryLimit) {
                throw new HTTPError_1.HTTPError(error.message, error.constructor.name, error.status, request.method, request.path);
            }
            request.retries++;
            return this.execute(request);
        }
        if (res.ok) {
            return new APIResponse_1.APIResponse(res, request.method, request.options, await res.json());
        }
        if (res.status >= 400 && res.status < 500) {
            let data;
            try {
                data = await res.json();
            }
            catch (err) {
                throw new HTTPError_1.HTTPError(res.statusText, res.constructor.name, res.status, request.method, request.path);
            }
            throw new APIError_1.APIError(request.path, data, request.method, res.status);
        }
        if (res.status >= 500 && res.status < 600) {
            if (request.retries === this.retryLimit) {
                throw new HTTPError_1.HTTPError(res.statusText, res.constructor.name, res.status, request.method, request.path);
            }
            request.retries++;
            return this.execute(request);
        }
        throw new HTTPError_1.HTTPError(res.statusText, res.constructor.name, res.status, request.method, request.path);
    }
}
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=RequestHandler.js.map