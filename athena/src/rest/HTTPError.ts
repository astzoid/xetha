import type { RequestMethod } from './RequestHandler';

export class HTTPError extends Error {
    public code: number;
    public method: RequestMethod;
    public path: string;

    public constructor(
        message: string,
        name: string,
        code: number,
        method: RequestMethod,
        path: string,
    ) {
        super(message);

        this.name = name;
        this.code = code || 500;
        this.method = method;
        this.path = path;
    }
}
