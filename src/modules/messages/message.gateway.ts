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
import { MessagesService } from './messages.service';
import { ConnectionsService } from './connections.service';

@WebSocketGateway({ cors: '*' })
@UseGuards(WSJwtGuard)
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly connectionsService: ConnectionsService,
    private readonly authorizationService: AuthorizationService,
    private readonly messagesService: MessagesService
  ) {}

  handleConnection(client: Socket, ..._: any[]) {
    const { sockets } = this.server.sockets;
    const userId = client.data.user?.userId;

    if (userId) {
      this.connectionsService.add(userId, client.id);
      console.log(`🟢 User connected: ${userId} | socketId: ${client.id}`);
    } else {
      console.log(`⚠️ Conexão sem userId, desconectando socket ${client.id}`);
      client.disconnect();
    }
    console.log(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`🔴 Socket id: ${client.id} Disconnected`);
    const userId = client.data.user?.userId;

    if (userId) {
      this.connectionsService.remove(userId);
      console.log(`🔴 User disconnected: ${userId}`);
    }
  }

  async afterInit(@ConnectedSocket() server: Server) {
    console.log('Socket is initialize');
    server.use(SocketAuthMiddleware(this.authorizationService) as any);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @UserWs() user: UserType
  ) {
    // Caso queira pegar o user do client
    // const fromUser = client.data.user;
    console.log(
      ` Mensagem recebida de ${user.userId}:`,
      JSON.stringify(data, null, 2)
    );
    const response = await this.messagesService.sendMessage(user, data);

    // pega o socketId do usuário destino
    const socketId = this.connectionsService.getSocketId(user.userId);

    if (socketId) {
      // responde pelo canal do usuário
      this.server.to(socketId).emit('receive-message', response);
    } else {
      console.log(
        `Usuário destino ${user.userId}[${user.email}] não conectado.`
      );
    }
  }

  // Exemplo de resposta do bot
  // responseMessage(userId, payload) {
  //   this.server.emit(
  //     `response-${userId}`,
  //     {
  //       ...payload,
  //       message: `Resposta do bot: ${payload.message}`,
  //       userId: 'bot',
  //     },
  //     'bot'
  //   );
  // }
}
