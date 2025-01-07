import { Socket } from 'socket.io';
import { ValidateJwtPayloadService } from '../providers/validate-jwt-payload.service';
import { WSJwtGuard } from '../guards/ws-jwt.guard';
import { AuthorizationService } from '../providers/authorization.service';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  authorizationService?: AuthorizationService
): SocketIOMiddleware => {
  return (client, next) => {
    try {
      const token = WSJwtGuard.extractTokenFromClient(client);
      const user = ValidateJwtPayloadService.handle(token);

      if (!user) {
        throw new Error('Não existe Usuario');
      }
      if (authorizationService) {
        authorizationService.handle(token);
      }
      // client = Object.assign(client, { user: user! });
      next();
    } catch (error) {
      next(new Error('Unauthorized'));
    }
  };
};
