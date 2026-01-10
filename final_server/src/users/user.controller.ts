import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { LoginUserDto } from './dto/weak-login-user.dto';
import { CreateUserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('weak_register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request — invalid data or email already exists',
  })
  async register(@Req() req, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.weakCreate(createUserDto);
    // const excludeId = req.user?.id;

    return newUser;
  }

  @Post('weak_auth')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() body: LoginUserDto) {
    const { email } = body;
    return this.userService.weakAuth(email);
  }
}
