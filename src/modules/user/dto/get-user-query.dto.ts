import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetUserQueryDto {
  @ApiProperty({
    description: 'consulta por name',
    type: String,
    example: 'Joao',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;
}
