import { Response } from 'node-fetch';
import { RequestMethod, RequestOptions, Data } from './RequestHandler';

export default class APIResponse<T = any> {
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

    public status: number;
    public method: RequestMethod;
    public options: RequestOptions;
    public headers: Data;
    public body: T;
}
