import { Module } from '@nestjs/common';
import { UsersModule } from './Users/Users.module';
import { ChatsModule } from './chats/chats.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, ChatsModule, PrismaModule],
})
export class AppModule {}
