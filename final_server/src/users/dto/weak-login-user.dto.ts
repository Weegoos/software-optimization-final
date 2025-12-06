// login-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email for login',
    example: 'user@example.com',
  })
  email: string;
}
