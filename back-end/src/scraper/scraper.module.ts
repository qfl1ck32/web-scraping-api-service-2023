import { Module } from '@nestjs/common';

import { BrowserModule } from '@src/browser/browser.module';

import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  imports: [BrowserModule],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
