import type { RequestMethod, RequestOptions, Data } from './RequestHandler';

export default class APIResponse<T = any> {
  constructor(
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

  status: number;
  method: RequestMethod;
  options: RequestOptions;
  headers: Data;
  body: T;
}
