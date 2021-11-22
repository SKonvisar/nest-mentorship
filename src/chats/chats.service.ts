import { Inject, Injectable } from '@nestjs/common';
import {
  ChatEntity,
  CHAT_ENTITY,
  MessageEntity,
  MESSAGE_ENTITY,
  UsersOnChatsRel,
  USERS_CHATS_REL,
} from '../prisma';

@Injectable()
export class ChatsService {
  constructor(
    @Inject(CHAT_ENTITY) private chatEntity: ChatEntity,
    @Inject(MESSAGE_ENTITY) private messageEntity: MessageEntity,
    @Inject(USERS_CHATS_REL) private userChatRel: UsersOnChatsRel,
  ) {}

  async createChat(creatorId: number, membersIds: number[]) {
    const idToUserIdField = (id: number) => ({ userId: id });
    const participantList = membersIds.map(idToUserIdField);
    participantList.push({ userId: creatorId });

    return await this.chatEntity.create({
      data: {
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

  async getUsersChats(userId: number) {
    return await this.userChatRel.findMany({
      where: { userId },
      select: {
        chat: {
          include: {
            members: {
              select: { user: true },
            },
          },
        },
      },
    });
  }

  async createMessage(creatorId: number, chatId: number, content: string) {
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
      },
    });
  }

  async getChatMessages(chatId: number) {
    return this.messageEntity.findMany({
      where: { chatId: chatId },
    });
  }
}

/** REMOVE CHATS
 * await this.userChatRel.deleteMany({ where: { chatId: 1 } });
 * await this.chatEntity.delete({ where: { id: 1 } });
 * return;
 */
