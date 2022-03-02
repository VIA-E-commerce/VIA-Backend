import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
    description: 'JWT Access 토큰',
  })
  accessToken: string;
}
