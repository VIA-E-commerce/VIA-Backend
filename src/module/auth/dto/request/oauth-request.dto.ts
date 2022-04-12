import { SNSProvider } from '@/models';

export class OAuthRequest {
  email: string;

  name: string;

  provider: SNSProvider;

  snsId: string;
}
