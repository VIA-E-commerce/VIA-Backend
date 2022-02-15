import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @ApiProperty({
    example: '2022-02-22 00:00:00',
    description: '생성일',
    required: true,
  })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({
    example: '2022-02-22 22:22:22',
    description: '수정일',
  })
  @UpdateDateColumn()
  updatedAt?: Date;
}
