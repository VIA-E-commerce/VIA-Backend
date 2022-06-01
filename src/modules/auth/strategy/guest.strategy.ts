import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

import { STRATEGY } from '../auth.constant';

@Injectable()
export class GuestStrategy extends PassportStrategy(Strategy, STRATEGY.GUEST) {
  constructor(private readonly logger: Logger) {
    super();
  }

  async validate() {
    this.logger.log('Guest 권한으로 접근');
    return {};
  }
}
