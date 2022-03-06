import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Color } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
})
export class ColorModule {}
