import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Color } from '@/models';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
})
export class ColorModule {}
