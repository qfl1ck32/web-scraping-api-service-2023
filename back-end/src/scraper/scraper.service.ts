import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

import { BrowserService } from '@src/browser/browser.service';
import { SentimentAnalysisService } from '@src/sentiment-analysis/sentiment-analysis.service';

import { InnerCardContent, Article, Publisher, Card } from './scraper.defs';

@Injectable()
export class ScraperService {
  constructor(
    protected readonly browserService: BrowserService,
    protected readonly sentimentAnalysisService: SentimentAnalysisService,
  ) {}

  private resolveUrl(base: string, relativeUrl: string) {
    const url = new URL(relativeUrl, base);
    return url.toString();
  }

  /**
   *
   * @param url the URL of the page to scrape
   * @throws WebsiteCouldNotBeReachedException
   * @returns the scraped content as Article[]
   */
  public async scrape(url: string): Promise<Article[]> {
    const html = await this.browserService.getHtml(url);
    const $ = cheerio.load(html);

    const cards = $('main > div > div > div:nth-of-type(2) > div');

    const results = cards
      .map((_, element) => this.processCard(url, $(element)))
      .toArray();

    return Promise.all(results);
  }

  private scrapeTitleAndShortDescription(
    card: cheerio.Cheerio<cheerio.Element>,
  ): {
    title: string;
    shortDescription: string;
  } {
    const content = card.find('div > div:nth-of-type(2)');

    const title = content.find('a').text();
    const shortDescription = content.find('> div:nth-of-type(2)').text();

    return { title, shortDescription };
  }

  private scrapeDateAndCategory(card: cheerio.Cheerio<cheerio.Element>): {
    date: string;
    category: string;
  } {
    const content = card.find('> div > div:first-child');

    const date = content.find('time').text();
    const category = content.find('div').text();

    return { date, category };
  }

  private scrapePublisher(
    baseUrl: string,
    card: cheerio.Cheerio<cheerio.Element>,
  ): Publisher {
    const content = card.find('> div > div:nth-of-type(3)');

    const relativeImage = content.find('img').attr('src');
    const absoluteImage = this.resolveUrl(baseUrl, relativeImage);

    const name = content.find('> div > div:first-child').text();
    const description = content.find('> div > div:nth-of-type(2)').text();

    return new Publisher({
      name,
      image: absoluteImage,
      description,
    });
  }

  private scrapeHrefAndImage(
    baseUrl: string,
    card: Card,
  ): {
    href: string;
    image: string;
  } {
    const anchor = card.find('a');
    const image = anchor.find('img');

    const relativeHref = anchor.attr('href');
    const absoluteHref = this.resolveUrl(baseUrl, relativeHref);

    const relativeImage = image.attr('src');
    const absoluteImage = this.resolveUrl(baseUrl, relativeImage);

    return { href: absoluteHref, image: absoluteImage };
  }

  private async processCard(baseUrl: string, card: Card): Promise<Article> {
    const { title, shortDescription } =
      this.scrapeTitleAndShortDescription(card);
    const { date, category } = this.scrapeDateAndCategory(card);
    const publisher = this.scrapePublisher(baseUrl, card);
    const { href, image } = this.scrapeHrefAndImage(baseUrl, card);

    const { longDescription } = await this.scrapeInnerContent(href);

    const sentiment = this.sentimentAnalysisService.analyze(longDescription);

    return new Article({
      title,
      short_description: shortDescription,
      date,
      publisher,
      category,
      long_description: longDescription,
      sentiment,
      href,
      image,
    });
  }

  private async scrapeInnerContent(url: string): Promise<InnerCardContent> {
    const html = await this.browserService.getHtml(url);
    const $ = cheerio.load(html);

    const content = $(
      'div > div > div > div > div:nth-of-type(2) > div:first-child',
    );

    const descriptionHtml = $(content).find('> div:nth-of-type(3)').html();
    const formattedDescription = descriptionHtml
      .replace(/<\/div>/gi, '\n')
      .replace(/<li>/gi, '• ')
      .replace(/<\/li>/gi, '\n');

    const cleanDescription = cheerio.load(formattedDescription).root().text();

    return new InnerCardContent({
      longDescription: cleanDescription,
    });
  }
}
