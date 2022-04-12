import { UserRequestDec } from '@/module/user';

export class LoginForm {
  @UserRequestDec.email()
  email: string;

  @UserRequestDec.password()
  password: string;
}
