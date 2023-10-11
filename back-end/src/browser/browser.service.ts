import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

import { WebsiteCouldNotBeReachedException } from './exceptions/website-could-not-be-reached';

@Injectable()
export class BrowserService {
  /**
   *
   * @param url the URL of the page to get the HTML of
   * @throws WebsiteCouldNotBeReachedException
   * @returns the HTML of the page at the given URL
   */
  public async getHtml(url: string) {
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
}
