import { Entity, ManyToOne } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ProductMetaInfo as MetaInfo } from './meta-info';
import { ProductGroup } from './product-group.entity';

@Entity()
export class Product extends CommonIdEntity {
  @MetaInfo.name()
  name: string;

  @MetaInfo.retailPrice()
  retailPrice: number;

  @MetaInfo.sellingPrice()
  sellingPrice: number;

  // 통계 속성
  @MetaInfo.salesVolume()
  salesVolume: number;

  @MetaInfo.reviewCount()
  reviewCount: number;

  @MetaInfo.wishCount()
  wishCount: number;

  // check 옵션
  @MetaInfo.show()
  show: boolean;

  @MetaInfo.onSale()
  onSale: boolean;

  @ManyToOne(() => ProductGroup, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  ProductGroup?: ProductGroup;
}
