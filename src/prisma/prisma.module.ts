import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const CHAT_ENTITY = 'DB_CHAT_ENTITY';
export const MESSAGE_ENTITY = 'DB_MESSAGE_ENTITY';
export const USERS_CHATS_REL = 'USERS_ON_CHATS_RELATION';

const ChatEntityProvider = {
  provide: CHAT_ENTITY,
  useFactory: (prisma: PrismaService) => {
    return prisma.chat;
  },
  inject: [PrismaService],
};

const MessageEntityProvider = {
  provide: MESSAGE_ENTITY,
  useFactory: (prisma: PrismaService) => {
    return prisma.message;
  },
  inject: [PrismaService],
};

const UsersOnChatsRelation = {
  provide: USERS_CHATS_REL,
  useFactory: (prisma: PrismaService) => {
    return prisma.usersOnChats;
  },
  inject: [PrismaService],
};

@Module({
  providers: [
    PrismaService,
    ChatEntityProvider,
    MessageEntityProvider,
    UsersOnChatsRelation,
  ],
  exports: [PrismaService, CHAT_ENTITY, MESSAGE_ENTITY, USERS_CHATS_REL],
})
export class PrismaModule {}
