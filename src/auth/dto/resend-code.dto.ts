import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResendCodeDto {
  @ApiProperty({
    description: 'Email do cliente',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Código de validação enviado na request',
    type: String,
    required: true,
  })
  @IsString()
  validationCode: string;
}
