// items/item.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './item.model';
import { ItemsService } from './item.service';
import { ItemsController } from './item.controller';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
