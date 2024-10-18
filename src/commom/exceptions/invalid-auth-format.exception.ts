import { UnauthorizedException } from '@nestjs/common';

export class InvalidAuthFormatException extends UnauthorizedException {
  constructor() {
    super(`invalid-authorization-format`);
  }
}
