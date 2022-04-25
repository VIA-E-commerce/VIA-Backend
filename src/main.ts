import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { swaggerConfig, corsConfig } from '@/config';
import { APP, API_URL, CONFIG } from '@/constant';
import {
  HttpExceptionFilter,
  SuccessInterceptor,
  CustomLoggerService,
} from '@/common';

import { AppModule } from './app.module';

class Application {
  private logger = new Logger(Application.name);
  private PORT: string;
  private DEV_MODE: boolean;

  constructor(private app: NestExpressApplication) {
    this.app = app;
    this.PORT = process.env.PORT;
    this.DEV_MODE = process.env.NODE_ENV === CONFIG.NODE_ENV.DEVELOPMENT;
  }

  private async setUpOpenAPI() {
    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup(
      `${APP.GLOBAL_PREFIX}${API_URL.SWAGGER.DOCS}`,
      this.app,
      document,
    );
  }

  private async setUpGlobalMiddleware() {
    this.app.enableCors(corsConfig(this.DEV_MODE));

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Request로 넘어온 데이터 형변환
        whitelist: true, // Request에서 Validation 데코레이터가 붙어있지 않은 속성 제거
        forbidNonWhitelisted: true, // Whitelist 조건에 맞지 않는 속성이 있으면 400 에러 (Bad Request)
      }),
    );
    this.app.useGlobalInterceptors(new SuccessInterceptor());
    this.app.useGlobalFilters(new HttpExceptionFilter());

    this.setUpOpenAPI();
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
  }

  async bootstrap() {
    this.app.setGlobalPrefix(APP.GLOBAL_PREFIX);
    await this.setUpGlobalMiddleware();
    await this.app.listen(this.PORT);
  }

  startLog() {
    this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
  }
}

async function init() {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: CustomLoggerService,
    bufferLogs: true,
  });

  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init();
