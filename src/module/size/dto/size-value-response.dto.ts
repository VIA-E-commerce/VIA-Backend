import { SwaggerDoc } from '@/common';
import { SizeValueDoc } from '@/docs';
import { SizeValue } from '@/models';

export class SizeValueResponse {
  @SwaggerDoc.id('사이즈 값 식별자')
  id: number;

  @SizeValueDoc.label()
  label: string;

  @SwaggerDoc.order('사이즈 값 정렬 순서')
  order: number;

  constructor(sizeValue: SizeValue) {
    this.id = sizeValue.id;
    this.label = sizeValue.label;
    this.order = sizeValue.order;
  }
}
