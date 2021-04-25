import type { RequestMethod } from '@rest/RequestHandler';

function flattenErrors(obj: Record<string, any>, key: string = '') {
  let messages: string[] = [];

  for (const [k, v] of Object.entries(obj)) {
    if (k === 'message') continue;

    const newKey = key
      ? typeof k === 'number' && Number.isNaN(k)
        ? `${key}.${k}`
        : `${key}[${k}]`
      : k;

    if (v._errors) {
      messages.push(
        `${newKey}: ${v._errors
          .map((e: { message: string }) => e.message)
          .join(' ')}`,
      );
    } else if (v.code || v.message) {
      messages.push(`${v.code ? `${v.code}: ` : ''}${v.message}`.trim());
    } else if (typeof v === 'string') {
      messages.push(v);
    } else {
      messages = messages.concat(flattenErrors(v, newKey));
    }
  }

  return messages;
}

export default class APIError extends Error {
  constructor(
    path: string,
    error: Record<string, any>,
    method: RequestMethod,
    status: number,
  ) {
    super();

    const flattened = flattenErrors(error.errors || error).join('\n');

    this.name = 'APIError';
    this.message =
      error.message && flattened
        ? `${error.message}\n${flattened}`
        : error.message || flattened;
    this.method = method;
    this.path = path;
    this.httpStatus = status;
    this.data = error;
  }

  method: RequestMethod;
  path: string;
  httpStatus: number;
  data: any;
}
