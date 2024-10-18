import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWT {
  constructor(private jwtService: JwtService) {}

  async sign(
    payload: string,
    options?: Omit<JwtSignOptions, keyof jwt.SignOptions>
  ) {
    return this.jwtService.signAsync(payload, options);
  }

  async verify(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verifyAsync(token, options);
  }
}
