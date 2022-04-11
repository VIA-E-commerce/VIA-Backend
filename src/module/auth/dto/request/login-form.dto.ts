import { UserDtoDec } from '../decorator';

export class LoginForm {
  @UserDtoDec.email()
  email: string;

  @UserDtoDec.password()
  password: string;
}
