import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { OptionValue } from '@/module/product';

import { Product } from './product.entity';

@Entity()
export class Variant extends CommonIdEntity {
  @Column({
    type: 'smallint',
    unsigned: true,
    default: 0,
  })
  quantity: number;

  @Column({
    default: false,
  })
  hide: boolean;

  // 연관 관계
  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  product: Product;

  @ManyToMany(() => OptionValue, (optionValue) => optionValue.variants, {
    cascade: ['insert'],
  })
  optionValues: OptionValue[];
}
