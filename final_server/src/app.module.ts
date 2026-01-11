// app.module.ts
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UsersModule } from './users/user.module';
import { User } from './users/user.model';
import { ItemsModule } from './items/item.module';

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
        synchronize: false,
        logging: console.log,
      }),
    }),

    UsersModule,
    ItemsModule,
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
