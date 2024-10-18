import { ForbiddenException } from '@nestjs/common';

export class InvalidResourceException extends ForbiddenException {
  constructor(resource: string) {
    super(`${resource}-invalid-resource`);
  }
}
