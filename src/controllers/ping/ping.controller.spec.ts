import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';

describe('AppController', () => {
  let pingController: PingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
    }).compile();

    pingController = app.get<PingController>(PingController);
  });

  describe('root', () => {
    it('should return Pong', () => {
      expect(pingController.getHello()).toStrictEqual({ message: 'Pong' });
    });
  });
});
