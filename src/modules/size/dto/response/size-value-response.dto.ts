import { SizeValue } from '@/models';

import { SizeValueResponseDec } from '../decorator';

export class SizeValueResponse {
  @SizeValueResponseDec.sizeValueId()
  id: number;

  @SizeValueResponseDec.label()
  label: string;

  @SizeValueResponseDec.order()
  order: number;

  constructor(sizeValue: SizeValue) {
    this.id = sizeValue.id;
    this.label = sizeValue.label;
    this.order = sizeValue.order;
  }
}
