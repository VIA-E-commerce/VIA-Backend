import { SwaggerValidation } from '@/common';
import { AddressDoc } from '@/docs';
import { AddressValidation } from '@/models';
import { applyDecorators } from '@nestjs/common';

export const AddressRequestDec = {
  addressId() {
    return applyDecorators(AddressDoc.addressId(), SwaggerValidation.id());
  },

  label() {
    return applyDecorators(AddressDoc.label(), AddressValidation.label());
  },

  recipient() {
    return applyDecorators(
      AddressDoc.recipient(),
      AddressValidation.recipient(),
    );
  },

  recipientPhone() {
    return applyDecorators(
      AddressDoc.recipientPhone(),
      AddressValidation.recipientPhone(),
    );
  },

  postalCode() {
    return applyDecorators(
      AddressDoc.postalCode(),
      AddressValidation.postalCode(),
    );
  },

  address() {
    return applyDecorators(AddressDoc.address(), AddressValidation.address());
  },

  addressDetail() {
    return applyDecorators(
      AddressDoc.addressDetail(),
      AddressValidation.addressDetail(),
    );
  },

  isDefault() {
    return applyDecorators(
      AddressDoc.isDefault(),
      AddressValidation.isDefault(),
    );
  },

  usedAt() {
    return applyDecorators(AddressDoc.usedAt(), AddressValidation.usedAt());
  },
};

export const AddressResponeDec = {
  addressId() {
    return applyDecorators(AddressDoc.addressId());
  },

  label() {
    return applyDecorators(AddressDoc.label());
  },

  recipient() {
    return applyDecorators(AddressDoc.recipient());
  },

  recipientPhone() {
    return applyDecorators(AddressDoc.recipientPhone());
  },

  postalCode() {
    return applyDecorators(AddressDoc.postalCode());
  },

  address() {
    return applyDecorators(AddressDoc.address());
  },

  addressDetail() {
    return applyDecorators(AddressDoc.addressDetail());
  },

  isDefault() {
    return applyDecorators(AddressDoc.isDefault());
  },

  usedAt() {
    return applyDecorators(AddressDoc.usedAt());
  },
};
