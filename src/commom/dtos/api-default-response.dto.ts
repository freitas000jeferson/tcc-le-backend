import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ApiDefaultResponse {
  @ApiProperty({
    description: 'Versão da API',
    example: '1.2.3',
    type: String,
  })
  apiVersion?: string;

  @ApiProperty({
    description: 'Versão da API',
    example: 'a2d2e2e2-ade9-1111-2222-123412341234',
    type: String,
  })
  transactionId?: string;

  @ApiProperty({
    description: 'Dados de retorno',
    example: null,
  })
  data: any;

  constructor(data?: any) {
    this.transactionId = randomUUID();
    this.apiVersion = process.env.npm_package_version || '';
    this.data = data;
  }
}
