import { UserRequestDec } from '@/modules/user';

export class JoinForm {
  @UserRequestDec.email()
  email: string;

  @UserRequestDec.password()
  password: string;

  @UserRequestDec.name()
  name: string;

  @UserRequestDec.phone()
  phone: string;
}
