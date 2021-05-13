import type { RequestMethod } from './RequestHandler';
export declare class APIError extends Error {
    method: RequestMethod;
    path: string;
    httpStatus: number;
    data: any;
    constructor(path: string, error: Record<string, any>, method: RequestMethod, status: number);
}
//# sourceMappingURL=APIError.d.ts.map