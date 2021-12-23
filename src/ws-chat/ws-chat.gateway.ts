import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/Users/Users.service';

import { WsAuthGuard } from './ws-auth.guard';

@WebSocketGateway(8001, { cors: { origin: '*' } })
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

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('send_message')
  async newMessageReceived(client, data) {
    const userChatList = await this.chatsService.createMessage(
      client.handshake.user.id,
      data.chatId,
      data.content,
    );

    const builder = this.server;
    for (const member of userChatList.chat.members) {
      builder.to(member.userId);
    }
    builder.emit('new_message_received', {
      chatId: userChatList.chatId,
      message: {
        chatId: userChatList.chatId,
        content: userChatList.content,
        createdAt: userChatList.createdAt,
        createdBy: userChatList.createdBy,
        id: userChatList.id,
        userId: userChatList.userId,
      },
    });
  }
}
