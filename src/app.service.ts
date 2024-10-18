import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHC() {
    return {
      env: this.configService.get<string>('ENV') ?? 'vazio',
      message: 'Hello World!',
      date: new Date().toISOString(),
      version: `${process.env.npm_package_version}`,
    };
  }
}
