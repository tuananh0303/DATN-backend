import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
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
