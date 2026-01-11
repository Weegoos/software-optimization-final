import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './item.service';
import { CreateItemDTO } from './dto/item-create.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('weak_create')
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    status: 201,
    description: 'Item created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request — invalid data',
  })
  async weakCreate(@Body() createItemDTO: CreateItemDTO) {
    const item = {
      name: createItemDTO.name,
      price: createItemDTO.price,
    };
    const newItem = await this.itemsService.weak_create(item);
    return newItem;
  }
}
