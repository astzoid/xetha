import { APIRequest } from './APIRequest';
import { APIResponse } from './APIResponse';
import { HTTPError } from './HTTPError';
import { APIError } from './APIError';
import merge from '@oadpoaw/merge';

export interface RequestOptions {
    route: string;
    data?: any;
    headers?: Record<string, string>;
    query?: Record<string, any>;
}

export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface Options {
    retryLimit: number;
    requestTimeout: number;
}

const defaultOptions: Options = {
    retryLimit: 1,
    requestTimeout: 15000,
};

export class RequestHandler {
    public uri: string;
    public retryLimit: number;
    public requestTimeout: number;

    public constructor(uri: string, options: Options = defaultOptions) {
        this.uri = uri;
        options = merge(defaultOptions, options);
        this.retryLimit = options.retryLimit;
        this.requestTimeout = options.requestTimeout;
    }

    public request<T>(
        method: RequestMethod,
        options: RequestOptions,
    ): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, method, options));
    }

    public get<T>(options: RequestOptions): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, 'GET', options));
    }

    public post<T>(options: RequestOptions): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, 'POST', options));
    }

    public patch<T>(options: RequestOptions): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, 'PATCH', options));
    }

    public put<T>(options: RequestOptions): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, 'PUT', options));
    }

    public delete<T>(options: RequestOptions): Promise<APIResponse<T>> {
        return this.execute(new APIRequest(this, 'DELETE', options));
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
                await res.json(),
            );
        }
        if (res.status >= 400 && res.status < 500) {
            let data;
            try {
                data = await res.json();
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
