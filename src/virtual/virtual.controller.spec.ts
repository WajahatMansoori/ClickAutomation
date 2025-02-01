import { Test, TestingModule } from '@nestjs/testing';
import { VirtualController } from './virtual.controller';

describe('VirtualController', () => {
  let controller: VirtualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VirtualController],
    }).compile();

    controller = module.get<VirtualController>(VirtualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
