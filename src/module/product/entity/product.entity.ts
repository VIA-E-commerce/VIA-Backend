import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity, SwaggerDoc } from '@/common';

import { ProductDoc as Doc } from '../doc';
import { PRODUCT } from '../product.constant';
import { ProductGroup } from './product-group.entity';

@Entity()
export class Product extends CommonEntity {
  @SwaggerDoc.id()
  @PrimaryGeneratedColumn({
    unsigned: true,
    name: 'product_id',
  })
  id: number;

  @Doc.name()
  @Column({
    length: PRODUCT.NAME.MAX_LENGTH,
  })
  name: string;

  @Doc.retailPrice()
  @Column({
    type: 'mediumint',
    unsigned: true,
    nullable: true,
  })
  retailPrice: number;

  @Doc.sellingPrice()
  @Column({
    type: 'mediumint',
    unsigned: true,
    default: 0,
  })
  sellingPrice: number;

  // 통계 속성
  @Doc.salesVolume()
  @Column({
    unsigned: true,
    default: 0,
  })
  salesVolume: number;

  @Doc.reviewCount()
  @Column({
    unsigned: true,
    default: 0,
  })
  reviewCount: number;

  @Doc.wishCount()
  @Column({
    unsigned: true,
    default: 0,
  })
  wishCount: number;

  // check 옵션
  @Doc.show()
  @Column({
    type: 'tinyint',
    default: 1,
  })
  show: boolean;

  @Doc.onSale()
  @Column({
    type: 'tinyint',
    default: 1,
  })
  onSale: boolean;

  @ManyToOne(() => ProductGroup, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  ProductGroup: ProductGroup;
}
