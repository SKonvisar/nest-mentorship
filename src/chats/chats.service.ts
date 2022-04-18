import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  ChatEntity,
  CHAT_ENTITY,
  MessageEntity,
  MESSAGE_ENTITY,
  UsersOnChatsRel,
  USERS_CHATS_REL,
} from '../prisma';
import { CreateChatDto, UpdateChatDto } from './dto/create-chat.dto';

// TODO: protect chats from users who are not in the chat
// TODO: chat can be deleted by admin or chat creator

@Injectable()
export class ChatsService {
  constructor(
    @Inject(CHAT_ENTITY) private chatEntity: ChatEntity,
    @Inject(MESSAGE_ENTITY) private messageEntity: MessageEntity,
    @Inject(USERS_CHATS_REL) private userChatRel: UsersOnChatsRel,
  ) {}

  async getChatById(chatId: string, userId: string) {
    const { chat } = await this.userChatRel.findFirst({
      where: { chatId: chatId, userId: userId },
      include: { chat: true },
    });

    return chat;
  }

  async createChat(creatorId: string, data: CreateChatDto) {
    const idToUserIdField = (id: string) => ({ userId: id });
    const participantList = data.membersIds.map(idToUserIdField);

    /* check if chat with the user already exist */
    if (participantList.length === 1) {
      const chatsWithUsers = await this.chatEntity.findMany({
        where: {
          AND: [
            { members: { some: { userId: creatorId } } },
            { members: { some: { userId: participantList[0].userId } } },
          ],
        },
        include: {
          members: true,
        },
      });

      const privateChatAlreadyExist = chatsWithUsers.some(
        (chat) => chat.members.length === 2,
      );

      if (privateChatAlreadyExist) {
        throw new BadRequestException();
      }
    }

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
    await this.messageEntity.deleteMany({ where: { chatId: id } });
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

  async updateChat(id: string, body: UpdateChatDto) {
    return this.chatEntity.update({
      where: { id: id },
      data: { name: body.name },
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
