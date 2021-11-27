import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/Users/Users.service';

import { WsAuthGuard } from './ws-auth.guard';

@WebSocketGateway(8001, { cors: true })
export class WsChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UsersService,
    private chatsService: ChatsService,
  ) {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('connection_data')
  async handleConnectionRequest(client) {
    const usersList = await this.userService.getAll();
    const userChatList = await this.chatsService.getUsersChats(
      client.handshake.user.id,
    );

    this.server
      .to(client.id)
      .emit('connection_data_res', { users: usersList, chats: userChatList });
  }
}
