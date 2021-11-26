import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsModule } from 'src/chats/chats.module';
import { UsersModule } from 'src/Users/Users.module';
import { WsChatGateway } from './ws-chat.gateway';

@Module({
  imports: [AuthModule, UsersModule, ChatsModule],
  providers: [WsChatGateway],
})
export class ChatModule {}
