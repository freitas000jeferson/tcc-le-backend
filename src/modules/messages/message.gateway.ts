import { Injectable, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User, UserType } from 'src/auth/decorators/user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { WSJwtGuard } from 'src/auth/guards/ws-jwt.guard';
import { SocketAuthMiddleware } from 'src/auth/middlewares/socket-auth.middleware';
import { UserWs } from 'src/auth/decorators/user-ws.decorator';
import { AuthorizationService } from 'src/auth/providers/authorization.service';

@WebSocketGateway({ cors: '*' })
@UseGuards(WSJwtGuard)
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server: Server;

  constructor(private readonly authorizationService: AuthorizationService) {}

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;
    console.log(`🟢 Client id: ${client.id} Connected`);
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    console.log(`🔴 Cliend id: ${client.id} Disconnected`);
  }

  async afterInit(@ConnectedSocket() server: Server) {
    console.log('Socket is initialize');
    server.use(SocketAuthMiddleware(this.authorizationService) as any);
  }

  // @UseGuards(AuthGuard)
  // @UseGuards(WsGuard)
  @SubscribeMessage('send-message')
  sendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @UserWs() user: UserType
  ) {
    console.log(`Payload: ${JSON.stringify(data, null, 2)}`);

    const { userId } = user;
    this.responseMessage(userId, data);
  }

  responseMessage(userId, payload) {
    this.server.emit(
      `response-${userId}`,
      {
        ...payload,
        message: `Resposta do bot: ${payload.message}`,
        userId: 'bot',
      },
      'bot'
    );
  }
}
