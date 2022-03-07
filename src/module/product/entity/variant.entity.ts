import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';
import { Color } from '@/module/color';

import { Product } from './product.entity';
import { SizeValue } from '@/module/size';

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

  @ManyToOne(() => Color, (color) => color.variants, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  color: Color;

  @ManyToOne(() => SizeValue, (sizeValue) => sizeValue.variants, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  sizeValue: SizeValue;
}
