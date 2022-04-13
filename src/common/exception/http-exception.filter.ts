import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorResponse } from '../interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | ErrorResponse;

    const isValidationError =
      typeof error !== 'string' && status === HttpStatus.BAD_REQUEST;

    const response = isValidationError ? { message: error.message[0] } : error;

    res.status(status).json(response);
  }
}
