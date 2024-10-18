import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Access token',
    type: String,
    required: true,
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'refresh token',
    type: String,
    required: true,
  })
  @IsString()
  refreshToken: string;

  @ApiProperty({
    description: 'Tipo do token',
    type: String,
    required: true,
  })
  @IsString()
  grantType: string;
}
