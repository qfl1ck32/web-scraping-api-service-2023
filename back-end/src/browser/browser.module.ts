import { Module } from '@nestjs/common';

import { BrowserService } from './browser.service';
import { BrowserController } from './browser.controller';

@Module({
  providers: [BrowserService],
  exports: [BrowserService],
  controllers: [BrowserController],
})
export class BrowserModule {}
