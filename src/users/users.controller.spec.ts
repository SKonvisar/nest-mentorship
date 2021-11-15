import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';

import { MockPrismaProvider } from '../prisma';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, MockPrismaProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
