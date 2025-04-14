import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class GetAvailableServiceInFacilityDto {
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  sportId: number;

  @ApiProperty({
    type: 'string',
    example: '08:00',
  })
  @IsMilitaryTime()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    type: 'string',
    example: '11:00',
  })
  @IsMilitaryTime()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({
    type: [Date],
    example: ['2025-04-23'],
  })
  @IsArray()
  @IsDate({ each: true })
  @Type(() => Date)
  dates: Date[];
}
