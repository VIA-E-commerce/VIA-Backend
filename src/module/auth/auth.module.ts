import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserModule, UserRepository } from '@/module/user';

import { strategies } from './strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from '@/config';
import { CONFIG } from '@/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<AuthConfig>(CONFIG.AUTH).accessTokenSecret,
        signOptions: {
          expiresIn: config.get<AuthConfig>(CONFIG.AUTH).accessTokenExp,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
