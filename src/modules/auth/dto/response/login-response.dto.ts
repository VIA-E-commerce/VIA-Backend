import { AuthResponseDec } from '../decorator';

export class LoginResponse {
  @AuthResponseDec.accessToken()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
