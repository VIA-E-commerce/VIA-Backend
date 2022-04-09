import { SNSProvider } from '@/models';
import { UserDoc } from '@/docs';

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
