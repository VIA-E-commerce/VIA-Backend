import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { ResponseEntity } from '../interface';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const res = ctx.switchToHttp().getResponse<Response>();
    const status: number = res.statusCode;

    return next.handle().pipe(
      map(
        (data): ResponseEntity => ({
          success: true,
          statusCode: status,
          data,
        }),
      ),
    );
  }
}
