import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { Product } from './product.entity';

@Entity()
export class ProductImage extends CommonIdEntity {
  @Column()
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
