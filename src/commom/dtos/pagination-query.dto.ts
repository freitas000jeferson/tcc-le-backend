import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../types/pagination.type';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Número da Página',
    type: Number,
    example: 0,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  page?: number = Number(0);

  @ApiProperty({
    description: 'Quantidade de itens por Página',
    type: Number,
    example: 10,
    default: Number(10),
    required: false,
  })
  @IsOptional()
  @IsNumber()
  size?: number = 10;

  @ApiProperty({
    description: 'Tipo de ordenação dos itens da Página',
    type: String,
    example: 'asc',
    default: 'asc',
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: SortOrder;

  @ApiProperty({
    description: 'Item a ser ordenado na Página',
    type: String,
    example: 'name',
    default: 'name',
    required: false,
  })
  @IsOptional()
  @IsString()
  order?: string;
}
