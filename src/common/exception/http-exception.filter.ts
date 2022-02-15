import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { ResponseEntity, ErrorResponse } from '../interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | ErrorResponse;

    const isValidationError =
      typeof error !== 'string' && error.statusCode === HttpStatus.BAD_REQUEST;

    const responseEntity: ResponseEntity = {
      success: false,
      statusCode: status,
      data: isValidationError ? error.message : error,
    };

    res.status(status).json(responseEntity);
  }
}
