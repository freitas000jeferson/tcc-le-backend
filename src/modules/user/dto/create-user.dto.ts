import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username do cliente',
    type: String,
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Avatar do cliente',
    type: String,
    required: true,
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'Email do cliente',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do cliente',
    type: String,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Confirmação de Senha do cliente',
    type: String,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  confirmPassword: string;
}
