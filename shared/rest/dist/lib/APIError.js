"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
function flattenErrors(obj, key = '') {
    let messages = [];
    for (const [k, v] of Object.entries(obj)) {
        if (k === 'message')
            continue;
        const newKey = key
            ? typeof k === 'number' && Number.isNaN(k)
                ? `${key}.${k}`
                : `${key}[${k}]`
            : k;
        if (v._errors) {
            messages.push(`${newKey}: ${v._errors
                .map((e) => e.message)
                .join(' ')}`);
        }
        else if (v.code || v.message) {
            messages.push(`${v.code ? `${v.code}: ` : ''}${v.message}`.trim());
        }
        else if (typeof v === 'string') {
            messages.push(v);
        }
        else {
            messages = messages.concat(flattenErrors(v, newKey));
        }
    }
    return messages;
}
class APIError extends Error {
    method;
    path;
    httpStatus;
    data;
    constructor(path, error, method, status) {
        super();
        const flattened = flattenErrors(error.errors || error).join('\n');
        this.name = 'APIError';
        this.message =
            error.message && flattened
                ? `${error.message}\n${flattened}`
                : error.message || flattened;
        this.method = method;
        this.path = path;
        this.httpStatus = status;
        this.data = error;
    }
}
exports.APIError = APIError;
//# sourceMappingURL=APIError.js.map