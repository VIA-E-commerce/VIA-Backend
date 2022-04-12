import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { COMMON } from '../../constants';

import { Product } from './product.entity';

@Entity()
export class ProductImage extends CommonIdEntity {
  @Column({
    length: COMMON.URL_MAX_LENGTH,
  })
  url: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  order: number;

  // 연관 관계
  @ManyToOne(() => Product, (product) => product.images, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  product: Product;
}
