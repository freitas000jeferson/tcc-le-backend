import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AuthMissingException,
  ResourceNotFoundException,
} from 'src/commom/exceptions';
import { FindAccessTokenService } from 'src/services/auth/find-access-token.service';
import { FindOneUserService } from 'src/services/user/find-one-user.service';
import { AuthorizationService } from '../providers/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService
  ) {}

  async canActivate(context: ExecutionContext) {
    // Se a request é publica: ja retorna
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    // Se é um token válido
    const token = this.extractTokenFromHeader(request);

    return this.authorizationService.handle(token, 'http');
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
