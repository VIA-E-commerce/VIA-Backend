import { SwaggerDoc } from '@/common';
import { AddressDoc } from '@/docs';
import { Address } from '@/models';

export class AddressResponse {
  @SwaggerDoc.id('주소 식별자')
  id: number;

  @AddressDoc.label()
  label: string;

  @AddressDoc.recipient()
  recipient: string;

  @AddressDoc.recipientPhone()
  recipientPhone: string;

  @AddressDoc.postalCode()
  postalCode: string;

  @AddressDoc.address()
  address: string;

  @AddressDoc.addressDetail()
  addressDetail: string;

  @AddressDoc.isDefault()
  isDefault: boolean;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @AddressDoc.usedAt()
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
