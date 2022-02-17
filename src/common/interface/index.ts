export interface ResponseEntity {
  success: boolean;
  statusCode: number;
  data?: any;
}

export interface ErrorResponse {
  error: string;
  statusCode: number;
  message: string | string[];
}

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};
