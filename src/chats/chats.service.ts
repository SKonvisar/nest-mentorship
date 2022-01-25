import { Inject, Injectable } from '@nestjs/common';
import {
  ChatEntity,
  CHAT_ENTITY,
  MessageEntity,
  MESSAGE_ENTITY,
  UsersOnChatsRel,
  USERS_CHATS_REL,
} from '../prisma';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @Inject(CHAT_ENTITY) private chatEntity: ChatEntity,
    @Inject(MESSAGE_ENTITY) private messageEntity: MessageEntity,
    @Inject(USERS_CHATS_REL) private userChatRel: UsersOnChatsRel,
  ) {}

  async createChat(creatorId: string, data: CreateChatDto) {
    const idToUserIdField = (id: string) => ({ userId: id });
    const participantList = data.membersIds.map(idToUserIdField);
    participantList.push({ userId: creatorId });

    return await this.chatEntity.create({
      data: {
        name: data.name,
        createdBy: {
          connect: { id: creatorId },
        },
        members: {
          create: participantList,
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async deleteChat(id: string) {
    await this.userChatRel.deleteMany({ where: { chatId: id } });
    await this.chatEntity.delete({ where: { id: id } });
    return;
  }

  async getUsersChats(userId: string) {
    return await this.userChatRel.findMany({
      where: { userId },
      select: {
        chat: {
          include: {
            members: {
              select: { user: true },
            },
            messages: {
              include: {
                createdBy: true,
              },
            },
          },
        },
      },
    });
  }

  async createMessage(creatorId: string, chatId: string, content: string) {
    return this.messageEntity.create({
      data: {
        content: content,
        chat: {
          connect: { id: chatId },
        },
        createdBy: {
          connect: { id: creatorId },
        },
      },
      include: {
        createdBy: true,
        chat: {
          include: {
            members: true,
          },
        },
      },
    });
  }

  async getChatMessages(chatId: string) {
    return this.messageEntity.findMany({
      where: { chatId: chatId },
    });
  }
}
