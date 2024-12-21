import { IsOptional, IsString, IsArray, IsDateString } from 'class-validator';

export class VocabularyEntity {
  @IsOptional()
  @IsString()
  id?: string;

  @IsArray()
  text: string[];

  @IsArray()
  images: string[];

  @IsArray()
  examples: string[];

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
