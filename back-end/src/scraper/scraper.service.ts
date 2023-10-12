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

  /**
   * Resolves a given relative URL to an absolute URL using the provided base.
   * @param base - The base URL against which the relative URL should be resolved.
   * @param relativeUrl - The relative URL to be converted to absolute.
   * @returns The absolute URL.
   */
  private resolveUrl(base: string, relativeUrl: string): string {
    const url = new URL(relativeUrl, base);
    return url.toString();
  }

  /**
   * Initiates the scraping process for a given URL and returns structured article data.
   * @param url - The target URL to scrape.
   * @returns An array of articles extracted from the specified URL.
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

  /**
   * Extracts the title and short description from a given card element.
   * @param card - The card element.
   * @returns An object containing the title and short description.
   */
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

  /**
   * Extracts the publication date and category from a given card element.
   * @param card - The card element.
   * @returns An object containing the date and category.
   */
  private scrapeDateAndCategory(card: cheerio.Cheerio<cheerio.Element>): {
    date: string;
    category: string;
  } {
    const content = card.find('> div > div:first-child');

    const date = content.find('time').text();
    const category = content.find('div').text();

    return { date, category };
  }

  /**
   * Extracts the publisher's details from a given card element.
   * @param baseUrl - Base URL for resolving relative image URLs.
   * @param card - The card element.
   * @returns A Publisher object.
   */
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

  /**
   * Extracts the href link and the associated image from a given card element.
   * @param baseUrl - Base URL for resolving relative URLs.
   * @param card - The card element.
   * @returns An object containing the absolute href and image URLs.
   */
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

  /**
   * Processes and extracts article details from a given card element.
   * @param baseUrl - The base URL used for resolving relative links.
   * @param card - The card element.
   * @returns An Article object.
   */
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

  /**
   * Scrapes and extracts the inner content of an article.
   * @param url - The URL of the article's inner content page.
   * @returns An InnerCardContent object.
   */
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
