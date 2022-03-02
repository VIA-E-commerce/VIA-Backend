import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @ApiPropertyOptional({
    example: '2022-02-22 00:00:00',
    description: '생성일',
  })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2022-02-22 22:22:22',
    description: '수정일',
  })
  @UpdateDateColumn()
  updatedAt?: Date;
}
