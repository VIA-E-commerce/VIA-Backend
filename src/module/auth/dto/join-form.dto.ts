import { UserDoc } from '@/docs';

export class JoinForm {
  @UserDoc.email()
  email: string;

  @UserDoc.password()
  password: string;

  @UserDoc.name()
  name: string;
}
