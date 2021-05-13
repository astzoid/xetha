import type { RequestMethod } from './RequestHandler';
export declare class HTTPError extends Error {
    code: number;
    method: RequestMethod;
    path: string;
    constructor(message: string, name: string, code: number, method: RequestMethod, path: string);
}
//# sourceMappingURL=HTTPError.d.ts.map