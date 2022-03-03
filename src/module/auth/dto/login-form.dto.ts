import { UserDoc } from '@/module/user';

export class LoginForm {
  @UserDoc.email()
  email: string;

  @UserDoc.password()
  password: string;
}
