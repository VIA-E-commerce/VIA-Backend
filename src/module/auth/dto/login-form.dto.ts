import { UserDoc } from '@/docs';

export class LoginForm {
  @UserDoc.email()
  email: string;

  @UserDoc.password()
  password: string;
}
