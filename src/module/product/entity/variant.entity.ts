import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

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
  @JoinTable({
    name: 'variant_option',
    joinColumns: [
      {
        name: 'variant_id',
      },
    ],
    inverseJoinColumns: [
      { name: 'option_id', referencedColumnName: 'option' },
      { name: 'value_id', referencedColumnName: 'id' },
    ],
  })
  optionValues: OptionValue[];
}
