import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity, SwaggerDoc } from '@/common';

import { ProductDoc as Doc } from '../doc';
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
  name: string;

  @Doc.retailPrice()
  retailPrice: number;

  @Doc.sellingPrice()
  sellingPrice: number;

  // 통계 속성
  @Doc.salesVolume()
  salesVolume: number;

  @Doc.reviewCount()
  reviewCount: number;

  @Doc.wishCount()
  wishCount: number;

  // check 옵션
  @Doc.show()
  show: boolean;

  @Doc.onSale()
  onSale: boolean;

  @ManyToOne(() => ProductGroup, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  ProductGroup: ProductGroup;
}
