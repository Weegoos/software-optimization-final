import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { User } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { CreationAttributes, QueryTypes } from 'sequelize';
import { IUser } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async weakAuth(email: string) {
    const users = await this.sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT },
    );

    return { users, message: 'The SQL Injection has detected' };
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
