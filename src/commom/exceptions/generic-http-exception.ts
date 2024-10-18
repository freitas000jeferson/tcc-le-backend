import { HttpException } from '@nestjs/common';

export class GenericHttpException extends HttpException {
  constructor({ message, status }) {
    super(message, status);
    console.error('ERROR:', message);
  }
}
