export interface HttpResponse<T> {
  statusCode: HttpsStatusCode;
  body: T;
};

export interface HttpRequest<B> {
  params?: any;
  headers?: any; 
  body?: B;
};

export enum HttpsStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  CREATED = 201
};

export interface IController {
  handle(HttpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>; 
};