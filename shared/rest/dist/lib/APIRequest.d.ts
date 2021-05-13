import type { RequestHandler, RequestMethod, RequestOptions } from './RequestHandler';
export declare class APIRequest {
    method: RequestMethod;
    options: RequestOptions;
    path: string;
    retries: number;
    private rest;
    constructor(rest: RequestHandler, method: RequestMethod, options: RequestOptions);
    make(): Promise<import("node-fetch").Response>;
}
//# sourceMappingURL=APIRequest.d.ts.map