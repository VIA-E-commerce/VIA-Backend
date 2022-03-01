import { Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity, SwaggerDoc } from '@/common';

import { ProductGroupDoc as Doc } from '../doc';

@Entity()
export class ProductGroup extends CommonEntity {
  @SwaggerDoc.id()
  @PrimaryGeneratedColumn({
    unsigned: true,
    name: 'product_group_id',
  })
  id: number;

  @Doc.name()
  name: string;

  @Doc.code()
  code: string;
}
