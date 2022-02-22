import { APP } from '@/constant';
import { DocumentBuilder } from '@nestjs/swagger';

const BEARER_AUTH_NAME = 'Access Token';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('VIA - API')
  .setDescription('VIA Fashion E-Commerce API Docs')
  .setVersion(APP.VERSION)
  .addBearerAuth(
    {
      type: 'http',
      description:
        'Http Request의 Authorization 헤더로 넘어올 JWT access 토큰을 넣어주세요',
    },
    BEARER_AUTH_NAME,
  )
  .addSecurityRequirements(BEARER_AUTH_NAME)
  .build();
