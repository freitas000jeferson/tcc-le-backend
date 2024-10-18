import { BadRequestException } from '@nestjs/common';

export class InvalidFieldsException extends BadRequestException {
  constructor() {
    super(`invalid-fields`);
  }
}
