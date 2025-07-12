import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { AuthorizationService } from '../providers/authorization.service';
import { ValidateJwtPayloadService } from '../providers/validate-jwt-payload.service';

@Injectable()
export class WSJwtGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    // Se é um token válido
    const token = WSJwtGuard.extractTokenFromClient(client);

    const isValid = this.authorizationService.handle(token, 'ws');
    if (isValid) {
      try {
        const user = ValidateJwtPayloadService.handle(token);
        // Salva user no client
        client.data.user = user;
      } catch (_) {
        return false;
      }
    }
    return isValid;
  }

  static extractTokenFromClient(client: Socket): string | undefined {
    const { authorization } = client.handshake.headers;
    const [type, token] = authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
