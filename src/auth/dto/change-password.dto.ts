import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Nova Senha',
    type: String,
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Confirmação de senha',
    type: String,
    required: true,
  })
  @IsStrongPassword()
  @IsString()
  confirmPassword: string;
}
