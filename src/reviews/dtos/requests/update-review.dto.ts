import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class UpdateReviewDto {
  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  reviewId: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({
    type: 'string',
    example: 'not bad',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
