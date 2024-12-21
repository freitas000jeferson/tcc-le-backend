import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsArray,
  IsDateString,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class OptionEntity {
  @IsNumber()
  id: number;

  @IsString()
  text: string;
}

export class QuestionEntity {
  @IsString()
  @IsOptional()
  id?: string;

  @IsOptional()
  text?: string[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @Type(() => OptionEntity)
  @ValidateNested()
  options?: OptionEntity[];

  @IsString()
  answer: string;

  @IsOptional()
  @IsNumber()
  answerId?: number;

  @IsString()
  categoryId: string;

  @IsNumber()
  level: number;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
