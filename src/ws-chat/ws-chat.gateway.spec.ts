import { Test, TestingModule } from '@nestjs/testing';
import { WsChatGateway } from './ws-chat.gateway';

describe('ChatGateway', () => {
  let gateway: WsChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsChatGateway],
    }).compile();

    gateway = module.get<WsChatGateway>(WsChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
