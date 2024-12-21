import { IsOptional, IsString, IsArray, IsDateString } from 'class-validator';

export class CategoryEntity {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  filter: string[];

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
