import { HttpResponse, HttpsStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({ 
  statusCode: HttpsStatusCode.OK, 
  body 
});

export const created = <T>(body: any): HttpResponse<T> => ({ 
  statusCode: HttpsStatusCode.CREATED, 
  body 
});

export const badRequest = (message: string): HttpResponse<string> => ({ 
  statusCode: HttpsStatusCode.BAD_REQUEST, 
  body: message 
});

export const serverError = (): HttpResponse<string> => ({
  statusCode: HttpsStatusCode.SERVER_ERROR,
  body: "Something Went Wrong."
});