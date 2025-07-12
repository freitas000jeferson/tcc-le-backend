import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionsService {
  private connections = new Map<string, string>(); // userId -> socketId

  add(userId: string, socketId: string) {
    this.connections.set(userId, socketId);
  }

  remove(userId: string) {
    this.connections.delete(userId);
  }

  getSocketId(userId: string): string | undefined {
    return this.connections.get(userId);
  }
}
