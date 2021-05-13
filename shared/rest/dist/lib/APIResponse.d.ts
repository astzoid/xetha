import type { RequestMethod, RequestOptions } from './RequestHandler';
import type { Response, Headers } from 'node-fetch';
export declare class APIResponse<T = any> {
    status: number;
    method: RequestMethod;
    options: RequestOptions;
    headers: Headers;
    body: T;
    constructor(res: Response, method: RequestMethod, options: RequestOptions, body: T);
}
//# sourceMappingURL=APIResponse.d.ts.map