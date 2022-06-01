import { IsOptional } from 'class-validator';

import { AddressRequestDec } from '../decorator';

export class CreateAddressRequest {
  @AddressRequestDec.label()
  label: string;

  @AddressRequestDec.recipient()
  recipient: string;

  @AddressRequestDec.recipientPhone()
  recipientPhone: string;

  @AddressRequestDec.postalCode()
  postalCode: string;

  @AddressRequestDec.address()
  address: string;

  @AddressRequestDec.addressDetail()
  @IsOptional()
  addressDetail: string;

  @AddressRequestDec.isDefault()
  @IsOptional()
  isDefault: boolean;
}
