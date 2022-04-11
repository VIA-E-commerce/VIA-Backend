import { SNSProvider } from '@/models';

import { UserDtoDec } from '../decorator';

export class OAuthRequest {
  @UserDtoDec.email()
  email: string;

  @UserDtoDec.name()
  name: string;

  @UserDtoDec.provider()
  provider: SNSProvider;

  @UserDtoDec.snsId()
  snsId: string;
}
