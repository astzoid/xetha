import { APIResponse } from './APIResponse';
export interface RequestOptions {
    route: string;
    data?: any;
    headers?: Record<string, string>;
    query?: Record<string, any>;
}
export declare type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export interface Options {
    retryLimit: number;
    requestTimeout: number;
}
export declare class RequestHandler {
    uri: string;
    retryLimit: number;
    requestTimeout: number;
    constructor(uri: string, options?: Options);
    request<T>(method: RequestMethod, options: RequestOptions): Promise<APIResponse<T>>;
    get<T>(options: RequestOptions): Promise<APIResponse<T>>;
    post<T>(options: RequestOptions): Promise<APIResponse<T>>;
    patch<T>(options: RequestOptions): Promise<APIResponse<T>>;
    put<T>(options: RequestOptions): Promise<APIResponse<T>>;
    delete<T>(options: RequestOptions): Promise<APIResponse<T>>;
    private execute;
}
//# sourceMappingURL=RequestHandler.d.ts.map