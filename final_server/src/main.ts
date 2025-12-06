import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Software Optimization Final Project')
    .setDescription('Final Project')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:9000', 'http://localhost:9001'],
    credentials: true,
  });

  const sequelize = app.get(Sequelize);
  await sequelize.sync({ force: true });

  await app.listen(3000);
  console.log('🚀 Swagger UI available at http://localhost:3000/api');
}
bootstrap();
