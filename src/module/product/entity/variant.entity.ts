import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { Product } from './product.entity';
import { OptionValue } from './option-value.entity';

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

  @ManyToMany(() => OptionValue, (optionValue) => optionValue.variants)
  @JoinTable({
    name: 'variant_option_value',
    inverseJoinColumn: { name: 'value_id', referencedColumnName: 'id' },
  })
  optionValues: OptionValue[];
}
