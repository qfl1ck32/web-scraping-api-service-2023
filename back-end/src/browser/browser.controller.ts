import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { BrowserService } from './browser.service';
import { ScreenshotDto } from './dto/screenshot.dto';
import { WebsiteCouldNotBeReachedException } from './exceptions/website-could-not-be-reached';

@Controller('browser')
export class BrowserController {
  constructor(protected readonly browserService: BrowserService) {}

  @ApiResponse({
    status: 200,
    description: 'The screenshot was successful. The result is base64-encoded.',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The URL could not be resolved.',
  })
  @Post('/screenshot')
  async screenshot(@Body() dto: ScreenshotDto): Promise<string> {
    try {
      const result = await this.browserService.getScreenshot(dto.url);

      return result.toString('base64');
    } catch (err) {
      if (err instanceof WebsiteCouldNotBeReachedException) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
