import { Response } from 'node-fetch';
import APIRequest from './APIRequest';
import APIResponse from './APIResponse';
import HTTPError from './HTTPError';
import APIError from './APIError';

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
  data?: Data;
  headers?: Data;
  query?: Data;
}

export interface Data {
  [key: string]: any;
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class RequestHandlerClass {
  public constructor(uri: string, token: string) {
    this.uri = uri;
    this.retryLimit = 1;
    this.requestTimeout = 15000;
    this._token = token;
  }

  private _token: string;
  public uri: string;
  public retryLimit: number;
  public requestTimeout: number;

  public get token() {
    if (!this._token) throw new Error(`Authentication Token Not Found`);
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }

  public request<T>(
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

    return null;
  }
}

const RequestHandler = new RequestHandlerClass(
  'http://127.0.0.1:3002',
  process.env.SECRET_KEY,
);
export default RequestHandler;
