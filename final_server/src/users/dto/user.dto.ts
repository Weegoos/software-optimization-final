import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Batyr',
    description: 'first name for registration',
  })
  firstName: string;

  @ApiProperty({
    example: 'Ashim',
    description: 'last name for registration',
  })
  lastName: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'email for registration',
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'password for registration',
  })
  password: string;
  @ApiProperty({
    example: 'user',
    description: 'role of the user',
  })
  role: 'user' | 'admin';
}
