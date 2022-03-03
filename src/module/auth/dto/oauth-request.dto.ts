import { SNSProvider, UserDoc } from '@/module/user';

export class OAuthRequest {
  @UserDoc.email()
  email: string;

  @UserDoc.name()
  name: string;

  @UserDoc.provider()
  provider: SNSProvider;

  @UserDoc.snsId()
  snsId: string;
}
