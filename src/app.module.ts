import { Module } from '@nestjs/common';
import { UsersModule } from './Users/Users.module';
import { ChatsModule } from './chats/chats.module';
import { ChatWsModule } from './ws-chat/ws-chat.module';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ChatWsModule, ChatsModule, PrismaModule, AuthModule],
})
export class AppModule {}
