import {
  RequestHandlerClass,
  RequestMethod,
  Data,
  RequestOptions,
} from './RequestHandler';
import fetch, { Response } from 'node-fetch';
import querystring from 'querystring';
import AbortController from 'abort-controller';

export default class APIRequest {
  public constructor(
    rest: RequestHandlerClass,
    method: RequestMethod,
    options: RequestOptions,
  ) {
    this.rest = rest;
    this.method = method;
    this.options = options;
    this.retries = 0;

    const query = options.query ? querystring.stringify(options.query) : null;
    this.path = `${rest.uri}${options.route}${query ? `?${query}` : ''}`;
  }

  private rest: RequestHandlerClass;
  public method: RequestMethod;
  public options?: RequestOptions;
  public path: string;
  public retries: number;

  public make(): Promise<Response> {
    let headers = {} as Data;
    let body;

    if (this.options.headers) {
      headers = Object.assign(headers, this.options.headers);
    }

    if (this.options.data) {
      body = JSON.stringify(this.options.data);
      headers['authorization'] = this.rest.token;
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
