import { Prisma } from '@prisma/client';

export { User } from '@prisma/client';

export type ChatEntity = Prisma.ChatDelegate<'rejectOnNotFound'>;
export type MessageEntity = Prisma.MessageDelegate<'rejectOnNotFound'>;
export type UsersOnChatsRel = Prisma.UsersOnChatsDelegate<'rejectOnNotFound'>;
