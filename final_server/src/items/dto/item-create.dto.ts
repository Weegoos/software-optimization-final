import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDTO {
  @ApiProperty({
    example: 'iPhone 15',
    description: 'Item name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 999.99,
    description: 'Item price',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with up to 2 decimal places' },
  )
  @IsNotEmpty()
  price: number;
}
