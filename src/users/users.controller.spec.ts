import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './Users.controller';
import { UsersService } from './Users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const result = [{ name: 'Serhii', id: 1 }];
      jest.spyOn(userService, 'getAll').mockResolvedValue(result);

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('getUserById', () => {
    it.todo('should return correct user');
    it.todo('should return an exception when there is no user with such an id');
  });
});
