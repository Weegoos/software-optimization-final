import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/user.module';
import { User } from './users/user.model';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // Создаём "чистый" экземпляр Sequelize для проверки подключения
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: configService.get<string>('DB_HOST'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          models: [User], // только допустимые поля
        });

        try {
          await sequelize.authenticate();
          console.log('✅ Database connected successfully');
        } catch (err) {
          console.error('❌ Database connection error:', err);
          throw err;
        }

        // Возвращаем конфигурацию для Nest/SequelizeModule
        return {
          dialect: 'postgres',
          host: configService.get<string>('DB_HOST'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          models: [User],
          autoLoadModels: true, // Nest option, можно включить
          synchronize: true,    // Nest option
        };
      },
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
