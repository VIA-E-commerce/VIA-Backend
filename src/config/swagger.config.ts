import { APP } from '@/constant';
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('VIA - API')
  .setDescription('VIA Fashion E-Commerce API Docs')
  .setVersion(APP.VERSION)
  .build();
