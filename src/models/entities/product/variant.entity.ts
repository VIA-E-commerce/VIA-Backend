import { Column, Entity, ManyToOne, RelationId, Unique } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { Color } from './color.entity';
import { Product } from './product.entity';
import { SizeValue } from './size-value.entity';

@Unique(['product', 'color', 'sizeValue'])
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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
    cascade: true,
  })
  product: Product;

  @RelationId((variant: Variant) => variant.product)
  productId: number;

  @ManyToOne(() => Color, (color) => color.variants, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  color: Color;

  @RelationId((variant: Variant) => variant.color)
  colorId: number;

  @ManyToOne(() => SizeValue, (sizeValue) => sizeValue.variants, {
    onUpdate: 'CASCADE',
    nullable: false,
  })
  sizeValue: SizeValue;

  @RelationId((variant: Variant) => variant.sizeValue)
  sizeValueId: number;
}
