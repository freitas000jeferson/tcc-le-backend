import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { AuthorizationService } from '../providers/authorization.service';

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

    return this.authorizationService.handle(token, 'ws');
  }

  static extractTokenFromClient(client: Socket): string | undefined {
    const { authorization } = client.handshake.headers;
    const [type, token] = authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
