import { Module } from '@nestjs/common';

import { BrowserModule } from '@src/browser/browser.module';
import { SentimentAnalysisModule } from '@src/sentiment-analysis/sentiment-analysis.module';

import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  imports: [BrowserModule, SentimentAnalysisModule],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
