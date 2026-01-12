import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { User } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { IUser } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}
  async weakAuth(email: string, password: string) {
    if (
      typeof email !== 'string' ||
      email.length < 3 ||
      email.length > 254 ||
      !/^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      throw new BadRequestException('Invalid email format');
    }

    if (
      typeof password !== 'string' ||
      password.length < 6 ||
      password.length > 128
    ) {
      throw new BadRequestException('Invalid password format');
    }

    const users = await this.sequelize.query(
      `SELECT * FROM users WHERE email = :email AND password = :password`,
      {
        replacements: { email, password },
        type: QueryTypes.SELECT,
      },
    );

    if (!users.length) {
      throw new BadRequestException('Invalid email or password');
    }

    return { users, message: 'Login success' };
  }

  async weakCreate(user: IUser): Promise<{ user: User }> {
    const existingUser = await this.userModel.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const createdUser = await this.userModel.create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      role: user.role,
    } as any);

    return { user: createdUser };
  }
}
