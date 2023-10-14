import { Module } from '@nestjs/common';

import { BrowserController } from './browser.controller';
import { BrowserService } from './browser.service';

@Module({
  providers: [BrowserService],
  exports: [BrowserService],
  controllers: [BrowserController],
})
export class BrowserModule {}
