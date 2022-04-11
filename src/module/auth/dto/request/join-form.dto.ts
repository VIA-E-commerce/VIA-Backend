import { UserDtoDec } from '../decorator';

export class JoinForm {
  @UserDtoDec.email()
  email: string;

  @UserDtoDec.password()
  password: string;

  @UserDtoDec.name()
  name: string;
}
