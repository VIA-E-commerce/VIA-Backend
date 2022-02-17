import { CommonEntity } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

import { UserRole, SNSProvider } from './enum';
import { USER } from './user.constant';

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends CommonEntity {
  @ApiProperty({
    description: '아이디',
    example: '1',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: USER.EMAIL.MESSAGE.IS_EMAIL })
  @IsNotEmpty({ message: USER.EMAIL.MESSAGE.IS_NOT_EMPTY })
  @MaxLength(USER.EMAIL.MAX_LENGTH)
  @Column({
    unique: true,
    length: USER.EMAIL.MAX_LENGTH,
  })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '12345678',
  })
  @IsNotEmpty({ message: USER.PASSWORD.MESSAGE.IS_NOT_EMPTY })
  @Length(USER.PASSWORD.MIN_LENGTH, USER.PASSWORD.MAX_LENGTH)
  @Column({
    length: USER.PASSWORD.MAX_LENGTH,
    nullable: true,
    select: false,
  })
  password: string;

  @ApiProperty({
    description: '회원의 실명',
    example: '홍길동',
    required: true,
  })
  @Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH)
  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: SNSProvider,
    default: SNSProvider.LOCAL,
  })
  provider: SNSProvider;

  @Column({
    nullable: true,
  })
  snsId: string;

  @Column({
    nullable: true,
    select: false,
  })
  refreshToken: string;
}
