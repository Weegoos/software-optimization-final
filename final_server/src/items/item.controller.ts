import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './item.service';
import { CreateItemDTO } from './dto/item-create.dto';
import { UpdateItemDTO } from './dto/update-item.dto';

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
    console.log('BODY DTO:', createItemDTO);
    const item = {
      name: createItemDTO?.name,
      price: createItemDTO?.price,
    };
    const newItem = await this.itemsService.weak_create(item);
    return newItem;
  }

  @Get('weak_find_all')
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'Items retrieved successfully',
  })
  async weakFindAll() {
    return this.itemsService.weak_find_all();
  }

  @Delete('weak_destroy/:id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Item deleted successfully',
  })
  async destroy(@Param('id') id: number) {
    await this.itemsService.destroy(id);
    return { message: 'Item deleted successfully' };
  }

  @Patch('weak_patch/:id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Item updated successfully',
  })
  async patch(@Param('id') id: string, @Body() item: UpdateItemDTO) {
    const updatedItem = await this.itemsService.patch(+id, item);
    return updatedItem;
  }
}
