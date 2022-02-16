import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbConfig } from '@/config';
import { APP, CONFIG } from '@/constant';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || APP.NODE_ENV.DEVELOPMENT}`,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(CONFIG.DB),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
