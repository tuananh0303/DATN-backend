import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AdditionalServiceDto {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  serviceId: number;

  @ApiProperty({
    type: Date,
    example: '2025-04-25',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
