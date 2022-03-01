import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity, SwaggerDoc } from '@/common';

import { ProductGroupDoc as Doc } from '../doc';
import { PRODUCT_GROUP } from '../product.constant';

@Entity()
export class ProductGroup extends CommonEntity {
  @SwaggerDoc.id()
  @PrimaryGeneratedColumn({
    unsigned: true,
    name: 'product_group_id',
  })
  id: number;

  @Doc.name()
  @Column({
    length: PRODUCT_GROUP.NAME.MAX_LENGTH,
  })
  name: string;

  @Doc.code()
  @Column({
    length: PRODUCT_GROUP.CODE.MAX_LENGTH,
    unique: true,
  })
  code: string;
}
