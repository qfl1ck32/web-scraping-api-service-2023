import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

import { WebsiteCouldNotBeReachedException } from './exceptions/website-could-not-be-reached';
import { ScrapedContent } from './scraper.defs';

@Injectable()
export class ScraperService {
  private async getHtml(url: string) {
    try {
      const browser = await puppeteer.launch({
        headless: 'new',
      });

      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'networkidle2' });

      const content = await page.content();

      await browser.close();

      return content;
    } catch (err) {
      throw new WebsiteCouldNotBeReachedException(); // for simplicity, assume that this is the only error that can be thrown
    }
  }

  public async scrape(url: string) {
    const results: ScrapedContent[] = [];

    const html = await this.getHtml(url);
    const $ = cheerio.load(html);

    const cards = $('main > div > div > div:nth-of-type(2) > div');

    cards.each((_, element) => {
      const card = $(element);

      const content = $(card).find('div > div:nth-of-type(2)');

      const title = $(content).find('a').text();

      const shortDescription = $(content).find('div').text();

      results.push({
        title,
        short_description: shortDescription,
      });
    });

    return results;
  }
}
