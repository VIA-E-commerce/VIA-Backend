import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
