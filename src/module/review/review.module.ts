import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Review } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewModule {}
