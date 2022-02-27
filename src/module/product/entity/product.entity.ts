import { Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { ProductMetaInfo as MetaInfo } from './meta-info';

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
}
