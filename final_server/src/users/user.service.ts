import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { User } from './user.model';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { IUser } from './interface/user.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,

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

    const user = await this.userModel.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.dataValues.id,
      email: user.dataValues.email,
      role: user.dataValues.role,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
    };

    const token = this.jwtService.sign(payload);

    return { message: 'Login success', token };
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

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
