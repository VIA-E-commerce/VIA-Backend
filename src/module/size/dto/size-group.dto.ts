import { SwaggerDoc } from '@/common';

import { SizeGroup } from '../entity';
import { SizeGroupDoc } from './dto.doc';
import { SizeValueResponse } from './size-value.dto';

export class SizeGroupResponse {
  @SwaggerDoc.id('사이즈 그룹 식별자')
  id: number;

  @SizeGroupDoc.label()
  label: string;

  values: SizeValueResponse[];

  constructor(sizeGroup: SizeGroup) {
    this.id = sizeGroup.id;
    this.label = sizeGroup.label;

    this.values = sizeGroup.values.map((value) => new SizeValueResponse(value));
  }
}
