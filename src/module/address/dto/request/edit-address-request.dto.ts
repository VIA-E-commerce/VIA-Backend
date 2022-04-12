import { IsOptional } from 'class-validator';

import { AddressRequestDec } from '../decorator';

export class EditAddressRequest {
  @AddressRequestDec.label()
  @IsOptional()
  label: string;

  @AddressRequestDec.recipient()
  @IsOptional()
  recipient: string;

  @AddressRequestDec.recipientPhone()
  @IsOptional()
  recipientPhone: string;

  @AddressRequestDec.postalCode()
  @IsOptional()
  postalCode: string;

  @AddressRequestDec.address()
  @IsOptional()
  address: string;

  @AddressRequestDec.addressDetail()
  @IsOptional()
  addressDetail: string;

  @AddressRequestDec.isDefault()
  @IsOptional()
  isDefault: boolean;

  @AddressRequestDec.usedAt()
  @IsOptional()
  usedAt: Date;
}
