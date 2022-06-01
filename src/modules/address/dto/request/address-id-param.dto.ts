import { AddressRequestDec } from '../decorator';

export class AddressIdParam {
  @AddressRequestDec.addressId()
  id: number;
}
