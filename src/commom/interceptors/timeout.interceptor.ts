import {
  CallHandler,
  ExecutionContext,
  Injectable,
  // eslint-disable-next-line prettier/prettier
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IntegrationTimeOutException } from '../exceptions';
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.status === 'ECONNABORTED') {
          throw new IntegrationTimeOutException(err.module);
        }

        throw err;
      })
    );
  }
}
