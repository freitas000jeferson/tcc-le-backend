import { RequestTimeoutException } from '@nestjs/common';

export class IntegrationTimeOutException extends RequestTimeoutException {
  public errorCode = 'INTEGRATION_TIMEOUT';

  constructor(module?: string) {
    super(
      module
        ? `Time out in integration with the module: ${module}`
        : 'Time out in integration with external module.'
    );
  }
}
