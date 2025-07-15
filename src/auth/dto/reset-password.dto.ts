import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Código de validação enviado por email',
    type: String,
    required: true,
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Email do cliente',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nova Senha',
    type: String,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  password: string;
}
