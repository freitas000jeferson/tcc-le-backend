import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username do cliente',
    type: String,
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Username do cliente',
    type: String,
    required: true,
  })
  @IsString()
  avatar: string;
}
