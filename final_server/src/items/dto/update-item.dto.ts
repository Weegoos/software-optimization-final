// src/items/dto/update-item.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateItemDTO } from './item-create.dto';

export class UpdateItemDTO extends PartialType(CreateItemDTO) {}
