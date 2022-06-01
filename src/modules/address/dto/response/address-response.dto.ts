import { SwaggerDoc } from '@/common';
import { Address } from '@/models';

import { AddressResponeDec } from '../decorator';

export class AddressResponse {
  @AddressResponeDec.addressId()
  id: number;

  @AddressResponeDec.label()
  label: string;

  @AddressResponeDec.recipient()
  recipient: string;

  @AddressResponeDec.recipientPhone()
  recipientPhone: string;

  @AddressResponeDec.postalCode()
  postalCode: string;

  @AddressResponeDec.address()
  address: string;

  @AddressResponeDec.addressDetail()
  addressDetail: string;

  @AddressResponeDec.isDefault()
  isDefault: boolean;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @AddressResponeDec.usedAt()
  usedAt: Date;

  constructor(address: Address) {
    this.id = address.id;
    this.label = address.label;
    this.recipient = address.recipient;
    this.recipientPhone = address.recipientPhone;
    this.postalCode = address.postalCode;
    this.address = address.address;
    this.addressDetail = address.addressDetail;
    this.isDefault = address.isDefault;

    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
    this.usedAt = address.usedAt;
  }
}
