import { UserDoc } from './dto.doc';

export class EditUserRequest {
  @UserDoc.name()
  name: string;

  @UserDoc.phone()
  phone: string;
}
