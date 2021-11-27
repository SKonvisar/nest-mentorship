import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './Users.service';

import { MockPrismaProvider, PrismaService } from '../prisma';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, MockPrismaProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all should invoke prisma findMany query of user collection', async () => {
    const result = [
      { id: 1, firstName: 'Test', lastName: 'User', email: 'test@mail.com' },
    ];
    const spy = jest.spyOn(prisma.user, 'findMany').mockResolvedValue(result);

    const data = await service.getAll();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(data).toBe(result);
  });

  it('get by id should invoke prisma findUnique query of user collection', async () => {
    const result = {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@mail.com',
    };
    const spy = jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

    const data = await service.getById(1);
    expect(spy).toHaveBeenCalledWith({
      where: { id: 1 },
      rejectOnNotFound: true,
    });
    expect(data).toBe(result);
  });

  it('should pass new user data to the prisma create method correctly', async () => {
    const spy = jest.spyOn(prisma.user, 'create').mockResolvedValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@mail.com',
      id: 1,
    });

    await service.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@mail.com',
    });
    expect(spy).toHaveBeenCalledWith({
      data: { name: 'Test user' },
    });
  });

  it('should pass id and updated fields to the prisma update method correctly', async () => {
    const spy = jest.spyOn(prisma.user, 'update').mockResolvedValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@mail.com',
      id: 1,
    });

    await service.update(1, { firstName: 'Test', lastName: 'User' });
    expect(spy).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { firstName: 'Test', lastName: 'User' },
    });
  });

  it('should id to the prisma delete method correctly', async () => {
    const spy = jest.spyOn(prisma.user, 'delete').mockResolvedValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@mail.com',
      id: 1,
    });

    await service.remove(1);
    expect(spy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
