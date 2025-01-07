import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WsException } from '@nestjs/websockets';
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
    const token = this.extractTokenFromClient(client);

    console.log('[WSGUARD] passou o authorization:', token);
    return this.authorizationService.handle(token, 'ws');

    // return super.canActivate(context);
  }
  extractTokenFromClient(client: Socket): string | undefined {
    const { authorization } = client.handshake.headers;
    const [type, token] = authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
