import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ValidateJwtPayloadService } from '../providers/validate-jwt-payload.service';
import { WSJwtGuard } from '../guards/ws-jwt.guard';

export const UserWs = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient();
    const token = WSJwtGuard.extractTokenFromClient(client);

    return ValidateJwtPayloadService.handle(token);
  }
);
