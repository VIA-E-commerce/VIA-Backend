import { Type } from 'class-transformer';
import { SwaggerDoc } from '@/common/doc';

export class IdParam {
  @SwaggerDoc.id('식별자')
  @Type(() => Number)
  id: number;
}
