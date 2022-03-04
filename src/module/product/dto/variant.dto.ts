import { OptionValue } from '../entity';

export class VariantOptionResponse {
  optionId: number;

  valueId: number;

  label: string;

  value: string;

  inputType: string;

  additionalCharge: number;

  constructor(optionValue: OptionValue) {
    const { option, ...value } = optionValue;

    this.optionId = option.id;
    this.valueId = value.id;
    this.label = option.label;
    this.value = value.value;
    this.inputType = option.inputType;
    this.additionalCharge = value.additionalCharge;
  }
}
