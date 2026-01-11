import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './item.model';
import { CreateItemDTO } from './dto/item-create.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private readonly itemModel: typeof Item,
  ) {}

  async weak_create(item: CreateItemDTO): Promise<Item> {
    const createdItem = await this.itemModel.create({
      name: item.name,
      price: item.price,
    } as any);

    return createdItem;
  }

  async weak_find_all(): Promise<Item[]> {
    return this.itemModel.findAll({
      order: [['updatedAt', 'DESC']],
    });
  }

  async destroy(id: number): Promise<void> {
    await this.itemModel.destroy({ where: { id } });
  }
  
  async patch(id: number, item: Partial<CreateItemDTO>): Promise<Item> {
    const existingItem = await this.itemModel.findByPk(id);
    if (!existingItem) {
      throw new Error('Item not found');
    }

    if (item.name !== undefined) {
      existingItem.name = item.name;
    }

    if (item.price !== undefined) {
      existingItem.price = item.price;
    }

    await existingItem.save();
    return existingItem;
  }
}
