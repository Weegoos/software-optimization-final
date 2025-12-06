import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { User } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

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
}
