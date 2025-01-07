import { Socket } from 'socket.io';
import { ValidateJwtPayloadService } from '../providers/validate-jwt-payload.service';

export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (): SocketIOMiddleware => {
  return (client, next) => {
    try {
      const { authorization } = client.handshake.headers;
      const [type, token] = authorization?.split(' ') ?? [];

      const accessToken = type === 'Bearer' ? token : undefined;
      console.log('## Validou Token', token);
      const user = ValidateJwtPayloadService.handle(accessToken);
      console.log('## User', user);

      if (!user) {
        throw new Error('Não existe Usuario');
      }
      client = Object.assign(client, {
        user: user,
      });
      next();
    } catch (error) {
      next(new Error('Unauthorized'));
    }
  };
};
