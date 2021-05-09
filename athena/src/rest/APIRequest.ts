import type {
    RequestHandlerClass,
    RequestMethod,
    RequestOptions,
} from '@rest/RequestHandler';
import querystring from 'querystring';

export default class APIRequest {
    constructor(
        rest: RequestHandlerClass,
        method: RequestMethod,
        options: RequestOptions,
    ) {
        this.rest = rest;
        this.method = method;
        this.options = options;
        this.retries = 0;

        const query = options.query
            ? querystring.stringify(options.query)
            : null;
        this.path = `${options.route}${query ? `?${query}` : ''}`;
    }

    private rest: RequestHandlerClass;
    method: RequestMethod;
    options: RequestOptions;
    path: string;
    retries: number;

    make(): Promise<Response> {
        let headers = {} as Record<string, string>;
        let body;

        if (this.options.headers) {
            headers = Object.assign(headers, this.options.headers);
        }

        if (this.options.data) {
            body = JSON.stringify(this.options.data);
            headers['Content-Type'] = 'application/json';
        }

        const controller = new AbortController();
        const timeout = setTimeout(
            () => controller.abort(),
            this.rest.requestTimeout,
        );

        return fetch(this.path, {
            method: this.method,
            headers,
            body,
            signal: controller.signal,
        }).finally(() => clearTimeout(timeout));
    }
}
