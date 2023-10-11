import { Module } from '@nestjs/common';

import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
