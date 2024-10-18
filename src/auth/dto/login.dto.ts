import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email do cliente',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'Senha do cliente',
    type: String,
    required: true,
  })
  @IsString()
  password: string;
}
