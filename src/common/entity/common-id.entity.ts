import { SwaggerDoc } from '@/common/doc';
import { PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from './common.entity';

export abstract class CommonIdEntity extends CommonEntity {
  @SwaggerDoc.id()
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;
}
