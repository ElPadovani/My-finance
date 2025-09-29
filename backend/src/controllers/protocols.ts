import { User } from "../models/user";

export interface HttpResponse<T> {
  statusCode: HttpsStatusCode;
  body: T;
};

export interface HttpRequest<B> {
  query?: any;
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
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>; 
};

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
}