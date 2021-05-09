import type { RequestMethod, RequestOptions } from './RequestHandler';
import type { Response, Headers } from 'node-fetch';

export class APIResponse<T = any> {
    public status: number;
    public method: RequestMethod;
    public options: RequestOptions;
    public headers: Headers;
    public body: T;

    public constructor(
        res: Response,
        method: RequestMethod,
        options: RequestOptions,
        body: T,
    ) {
        this.status = res.status;
        this.method = method;
        this.options = options;
        this.headers = res.headers;
        this.body = body;
    }
}
