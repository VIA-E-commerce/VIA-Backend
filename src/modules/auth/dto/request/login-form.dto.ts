import { UserRequestDec } from '@/modules/user';

export class LoginForm {
  @UserRequestDec.email()
  email: string;

  @UserRequestDec.password()
  password: string;
}
