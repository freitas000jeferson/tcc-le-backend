import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateTokenService {
  constructor(private jwtService: JwtService) {}

  async handle(token: string, options?: any) {
    try {
      await this.jwtService.verify(token, { ...options });
      return {
        isValid: true,
      };
    } catch (error) {
      return { isValid: false, error };
    }
  }
}
