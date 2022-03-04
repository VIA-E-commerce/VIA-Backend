import { SwaggerDoc } from '@/common';
import { ApiProperty } from '@nestjs/swagger';

import { Option, OptionValue } from '../entity';
import { InputType } from '../enum';
import { OptionDoc, OptionValueDoc } from './dto.doc';

export class OptionValueResponse {
  @SwaggerDoc.id()
  id: number;

  @OptionValueDoc.value()
  value: string;

  @OptionValueDoc.additionalCharge()
  additionalCharge: number;

  @OptionValueDoc.order()
  order: number;

  constructor(optionValue: OptionValue) {
    const { id, value, additionalCharge, order } = optionValue;

    this.id = id;
    this.value = value;
    this.additionalCharge = additionalCharge;
    this.order = order;
  }
}

export class OptionResponse {
  @SwaggerDoc.id()
  id: number;

  @OptionDoc.label()
  label: string;

  @OptionDoc.description()
  description: string;

  @OptionDoc.inputType()
  inputType: InputType;

  @OptionDoc.order()
  order: number;

  @ApiProperty({
    description: '상품 옵션값',
    type: [OptionValueResponse],
  })
  values: OptionValueResponse[];

  constructor(option: Option) {
    const { id, label, description, inputType, order, values } = option;

    this.id = id;
    this.label = label;
    this.description = description;
    this.inputType = inputType;
    this.order = order;

    this.values = values.map((value) => new OptionValueResponse(value));
  }
}
