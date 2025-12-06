// app.module.ts
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UsersModule } from './users/user.module';
import { User } from './users/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        models: [User],
        autoLoadModels: true,
        synchronize: true,
        logging: console.log,
      }),
    }),

    UsersModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async onApplicationBootstrap() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connected successfully');
    } catch (err) {
      console.error('❌ Database connection error:', err.message);
      process.exit(1);
    }
  }
}
