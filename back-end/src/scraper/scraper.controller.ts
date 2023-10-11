import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ScrapeDto } from './dto/scrape.dto';
import { WebsiteCouldNotBeReachedException } from './exceptions/website-could-not-be-reached';
import { ScrapedContent } from './scraper.defs';
import { ScraperService } from './scraper.service';

@ApiTags('Scraper')
@Controller('scraper')
export class ScraperController {
  constructor(protected readonly scraperService: ScraperService) {}

  @ApiResponse({
    status: 200,
    description: 'The scraper was successful.',
    type: [ScrapedContent],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The URL could not be resolved.',
  })
  @Post()
  async scrape(@Body() dto: ScrapeDto) {
    try {
      const result = await this.scraperService.scrape(dto.url);

      return result;
    } catch (err) {
      if (err instanceof WebsiteCouldNotBeReachedException) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
