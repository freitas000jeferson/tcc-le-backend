import { UnauthorizedException } from '@nestjs/common';

export class AuthMissingException extends UnauthorizedException {
  constructor() {
    super(`missing-authorization-header`);
  }
}
