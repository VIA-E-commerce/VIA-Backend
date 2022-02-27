import { CommonEntity } from '@/common';
import { Entity } from 'typeorm';

import { ProductDocs } from './product.entity.docs';

@Entity()
export class Product extends CommonEntity {
  @ProductDocs.id()
  id: number;

  @ProductDocs.name()
  name: string;

  @ProductDocs.retailPrice()
  retailPrice: number;

  @ProductDocs.sellingPrice()
  sellingPrice: number;

  // 통계 속성
  @ProductDocs.salesVolume()
  salesVolume: number;

  @ProductDocs.reviewCount()
  reviewCount: number;

  @ProductDocs.wishCount()
  wishCount: number;

  // check 옵션
  @ProductDocs.show()
  show: boolean;

  @ProductDocs.onSale()
  onSale: boolean;
}
