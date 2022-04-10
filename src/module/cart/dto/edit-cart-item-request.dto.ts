import { CartDoc } from '@/docs';

export class EditCartItemRequest {
  @CartDoc.quantity()
  quantity: number;
}
