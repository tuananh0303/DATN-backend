import { ApiProperty } from '@nestjs/swagger';
import { PlaymateGenderEnum } from '../enums/playmate-gender.enum';
import { PlaymateLevelEnum } from '../enums/playmate-level.enum';
import { PlaymatePaymentType } from '../enums/playmate-payment-type.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreatePlaymateDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: [String],
  })
  @IsUrl({}, { each: true })
  @IsArray()
  @IsOptional()
  imagesUrl?: string[];

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  bookingSlotId: number;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  description?: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  additionalInfor?: string;

  @ApiProperty({
    enum: PlaymatePaymentType,
    example: PlaymatePaymentType.TOTAL,
  })
  @IsEnum(PlaymatePaymentType)
  @IsNotEmpty()
  paymentType: PlaymatePaymentType;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  totalCost?: number;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  maleCost?: number;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  femaleCost?: number;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsOptional()
  detailOfCost?: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  @IsNotEmpty()
  isTeam: boolean;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  minParticipant: number;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  maxParticipant: number;

  @ApiProperty({
    enum: PlaymateGenderEnum,
    example: PlaymateGenderEnum.NONE,
  })
  @IsEnum(PlaymateGenderEnum)
  @IsNotEmpty()
  gender: PlaymateGenderEnum;

  @ApiProperty({
    enum: PlaymateLevelEnum,
    example: PlaymateLevelEnum.NONE,
  })
  @IsEnum(PlaymateLevelEnum)
  @IsNotEmpty()
  level: PlaymateLevelEnum;
}
