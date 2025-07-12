import { ApiProperty } from '@nestjs/swagger';
import { ResetPasswordDto } from './change-password.dto';
import { IsEmail, IsString } from 'class-validator';

export class ValidateCodeAndEmailDto
  implements Omit<ResetPasswordDto, 'password'>
{
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
}
