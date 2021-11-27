import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '../types';

const USERS: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'mock@email.com' },
];

class MockPrismaEntity<T> {
  constructor(private collection: T[]) {}

  async findMany() {
    throw new Error('Not implemented');
  }
  async findUnique() {
    throw new Error('Not implemented');
  }
  async create() {
    throw new Error('Not implemented');
  }
  async delete() {
    throw new Error('Not implemented');
  }
  async update() {
    throw new Error('Not implemented');
  }
}

@Injectable()
class MockPrismaService {
  user: MockPrismaEntity<User>;
  constructor() {
    this.user = new MockPrismaEntity<User>(USERS);
  }
}

export const MockPrismaProvider = {
  provide: PrismaService,
  useClass: MockPrismaService,
};
