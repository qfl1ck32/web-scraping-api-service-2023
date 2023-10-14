import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './app.config';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ScraperModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
})
export class AppModule {}
