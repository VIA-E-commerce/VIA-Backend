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
