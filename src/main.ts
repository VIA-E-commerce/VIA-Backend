import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

class Application {
  private logger = new Logger(Application.name);
  private PORT: string;

  constructor(private app: INestApplication) {
    this.app = app;
    this.PORT = process.env.PORT;
  }

  async bootstrap() {
    this.app = await NestFactory.create(AppModule);
    await this.app.listen(this.PORT);
  }

  startLog() {
    this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
  }
}

async function init() {
  const server = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init();
