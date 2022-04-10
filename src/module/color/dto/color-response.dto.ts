import { SwaggerDoc } from '@/common';
import { ColorDoc } from '@/docs';
import { Color } from '@/models';

export class ColorResponse {
  @SwaggerDoc.id('색상 식별자')
  id: number;

  @ColorDoc.label()
  label: string;

  @ColorDoc.hexCode()
  hexCode: string;

  constructor(color: Color) {
    this.id = color.id;
    this.label = color.label;
    this.hexCode = color.hexCode;
  }
}
