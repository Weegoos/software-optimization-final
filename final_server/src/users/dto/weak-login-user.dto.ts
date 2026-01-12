import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email for login',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password for login',
    example: 'StrongPassword123',
  })
  password: string;
}
