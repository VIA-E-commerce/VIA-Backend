import { Color } from '@/models';

import { ColorResponseDec } from '../decorator';

export class ColorResponse {
  @ColorResponseDec.colorId()
  id: number;

  @ColorResponseDec.label()
  label: string;

  @ColorResponseDec.hexCode()
  hexCode: string;

  constructor(color: Color) {
    this.id = color.id;
    this.label = color.label;
    this.hexCode = color.hexCode;
  }
}
