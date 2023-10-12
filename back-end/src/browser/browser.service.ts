import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

import { WebsiteCouldNotBeReachedException } from './exceptions/website-could-not-be-reached';

/**
 * A service to interact with web browsers using Puppeteer.
 * @class
 */
@Injectable()
export class BrowserService {
  /**
   * Fetches the HTML content of a given URL using Puppeteer.
   *
   * @param {string} url - The URL of the website to fetch its HTML content.
   * @returns {Promise<string>} A promise that resolves to the HTML content of the website.
   * @throws {WebsiteCouldNotBeReachedException} Throws an exception if the website cannot be reached or other Puppeteer errors.
   */
  public async getHtml(url: string): Promise<string> {
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
