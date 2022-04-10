import { UserDoc } from '@/docs';
import { SNSProvider } from '@/models';

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
