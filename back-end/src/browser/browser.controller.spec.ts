import { Test, TestingModule } from '@nestjs/testing';

import { BrowserController } from './browser.controller';

describe('BrowserController', () => {
  let controller: BrowserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrowserController],
    }).compile();

    controller = module.get<BrowserController>(BrowserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
