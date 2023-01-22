import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationItemService } from './configuration-item.service';

describe('ConfigurationItemService', () => {
  let service: ConfigurationItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationItemService],
    }).compile();

    service = module.get<ConfigurationItemService>(ConfigurationItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
