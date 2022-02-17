import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JoinForm } from './dto';
import { AuthService } from './auth.service';
import { Docs } from './auth.docs';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Docs.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }
}
