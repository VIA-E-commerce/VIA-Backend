export interface ErrorResponse {
  message: string;
}

export type SwaggerMethodDoc<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export type SwaggerFieldDoc<T> = {
  [K in keyof T]?: (prop?: any) => PropertyDecorator;
};

export type SwaggerEntityDoc<Entity> = SwaggerFieldDoc<Entity>;

export interface PagingOptions {
  pageNum: number;
  pageSize: number;
}
