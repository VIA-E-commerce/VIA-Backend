import { IsOptional } from 'class-validator';

import { UserRequestDec } from '../decorator';

export class EditUserRequest {
  @UserRequestDec.name()
  @IsOptional()
  name: string;

  @UserRequestDec.phone()
  @IsOptional()
  phone: string;
}
