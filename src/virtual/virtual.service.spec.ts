import { Test, TestingModule } from '@nestjs/testing';
import { VirtualService } from './virtual.service';

describe('VirtualService', () => {
  let service: VirtualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VirtualService],
    }).compile();

    service = module.get<VirtualService>(VirtualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
