import { ConflictException } from '@nestjs/common';

export class AlreadyExistException extends ConflictException {
  constructor(resource: string) {
    super(`${resource}-already-registered`);
  }
}
