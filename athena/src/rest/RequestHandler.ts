import APIRequest from '@rest/APIRequest';
import APIResponse from '@rest/APIResponse';
import HTTPError from '@rest/HTTPError';
import APIError from '@rest/APIError';

function parseResponse(res: Response) {
    let val;
    try {
        val = res.json();
    } catch (e) {
        val = res.text();
    } finally {
        return val;
    }
}

export interface RequestOptions {
    route: string;
    data?: any;
    headers?: Record<string, string>;
    query?: Record<string, any>;
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class RequestHandlerClass {
    constructor() {
        this.retryLimit = 1;
        this.requestTimeout = 15000;
    }

    retryLimit: number;
    requestTimeout: number;

    request<T>(
        method: RequestMethod,
        options: RequestOptions,
    ): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, method, options));
    }

    private async execute(request: APIRequest): Promise<APIResponse> {
        let res;

        try {
            res = await request.make();
        } catch (error) {
            if (request.retries === this.retryLimit) {
                throw new HTTPError(
                    error.message,
                    error.constructor.name,
                    error.status,
                    request.method,
                    request.path,
                );
            }

            request.retries++;

            return this.execute(request);
        }

        if (res.ok) {
            return new APIResponse(
                res,
                request.method,
                request.options,
                await parseResponse(res),
            );
        }

        if (res.status >= 400 && res.status < 500) {
            let data;

            try {
                data = await parseResponse(res);
            } catch (err) {
                throw new HTTPError(
                    res.statusText,
                    res.constructor.name,
                    res.status,
                    request.method,
                    request.path,
                );
            }

            throw new APIError(request.path, data, request.method, res.status);
        }

        if (res.status >= 500 && res.status < 600) {
            if (request.retries === this.retryLimit) {
                throw new HTTPError(
                    res.statusText,
                    res.constructor.name,
                    res.status,
                    request.method,
                    request.path,
                );
            }

            request.retries++;

            return this.execute(request);
        }

        throw new HTTPError(
            res.statusText,
            res.constructor.name,
            res.status,
            request.method,
            request.path,
        );
    }
}

const RequestHandler = new RequestHandlerClass();
export default RequestHandler;
