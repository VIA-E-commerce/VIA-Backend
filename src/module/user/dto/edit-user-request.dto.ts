import { UserDoc } from '@/docs';

export class EditUserRequest {
  @UserDoc.name()
  name: string;

  @UserDoc.phone()
  phone: string;
}
