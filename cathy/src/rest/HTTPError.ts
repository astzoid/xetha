import { RequestMethod } from './RequestHandler';

export default class HTTPError extends Error {
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

    public code: number;
    public method: RequestMethod;
    public path: string;
}
