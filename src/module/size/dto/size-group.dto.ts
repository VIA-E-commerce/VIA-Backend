import { ApiProperty } from '@nestjs/swagger';

import { SwaggerDoc } from '@/common';
import { SizeGroupDoc } from '@/docs';
import { SizeGroup } from '@/models';

import { SizeValueResponse } from './size-value.dto';

export class SizeGroupResponse {
  @SwaggerDoc.id('사이즈 그룹 식별자')
  id: number;

  @SizeGroupDoc.label()
  label: string;

  @ApiProperty({
    description: '사이즈 값 목록',
    type: [SizeValueResponse],
  })
  values: SizeValueResponse[];

  constructor(sizeGroup: SizeGroup) {
    this.id = sizeGroup.id;
    this.label = sizeGroup.label;

    this.values = sizeGroup.values.map((value) => new SizeValueResponse(value));
  }
}
