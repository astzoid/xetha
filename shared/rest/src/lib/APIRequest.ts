import type {
    RequestHandler,
    RequestMethod,
    RequestOptions,
} from './RequestHandler';
import fetch from 'node-fetch';
import AbortController from 'abort-controller';
import querystring from 'querystring';

export class APIRequest {
    public method: RequestMethod;
    public options: RequestOptions;
    public path: string;
    public retries: number;

    private rest: RequestHandler;

    public constructor(
        rest: RequestHandler,
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
        this.path = `${this.rest.uri}${options.route}${
            query ? `?${query}` : ''
        }`;
    }

    public make() {
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
