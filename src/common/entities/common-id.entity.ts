import { PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from './common.entity';

export abstract class CommonIdEntity extends CommonEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;
}
