import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { isObject, isString } from 'class-validator';
import { Response } from 'express';

import { ErrorResponse } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | ErrorResponse;

    let response: ErrorResponse = { message: undefined };

    if (isString(error)) {
      response.message = error;
    } else if (isObject(error.message)) {
      response.message = error.message[0];
    } else {
      response = error;
    }

    res.status(status).json(response);
  }
}
