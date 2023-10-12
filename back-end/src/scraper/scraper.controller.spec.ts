import { Test, TestingModule } from '@nestjs/testing';

import { BrowserModule } from '@src/browser/browser.module';
import { SentimentAnalysisModule } from '@src/sentiment-analysis/sentiment-analysis.module';

import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

describe('ScraperController', () => {
  let controller: ScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BrowserModule, SentimentAnalysisModule],
      providers: [ScraperService],
      controllers: [ScraperController],
    }).compile();

    controller = module.get<ScraperController>(ScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
