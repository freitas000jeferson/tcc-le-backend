import { Type } from 'class-transformer';
import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { CategoryEntity } from 'src/entities/Category.entity';

export class CreateNewCategoryDto {
  @IsArray()
  @Type(() => CategoryEntity)
  @ValidateNested()
  categories: CategoryEntity[];
}
