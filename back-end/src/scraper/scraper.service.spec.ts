import { Test, TestingModule } from '@nestjs/testing';

import { ScraperService } from './scraper.service';

describe('ScraperService', () => {
  let service: ScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperService],
    }).compile();

    service = module.get<ScraperService>(ScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('scrape', async () => {
    const url = 'https://wsa-test.vercel.app/';

    const content = await service.scrape(url);

    expect(content).toBeDefined();
  });
});
