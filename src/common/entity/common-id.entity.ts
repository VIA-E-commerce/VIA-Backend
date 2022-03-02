import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from './common.entity';

export abstract class CommonIdEntity extends CommonEntity {
  @ApiProperty({
    description: '식별자',
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;
}
