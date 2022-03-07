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

export type SwaggerFieldDoc<T> = {
  [K in keyof T]: () => PropertyDecorator;
};

export interface PagingOptions {
  pageNum: number;
  pageSize: number;
}
