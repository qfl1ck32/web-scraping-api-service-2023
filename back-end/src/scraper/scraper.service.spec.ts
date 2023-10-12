import { TestingModule, Test } from '@nestjs/testing';

import { BrowserModule } from '@src/browser/browser.module';
import { Sentiment } from '@src/sentiment-analysis/sentiment-analysis.defs';
import { SentimentAnalysisModule } from '@src/sentiment-analysis/sentiment-analysis.module';

import { Article, Publisher } from './scraper.defs';
import { ScraperService } from './scraper.service';

describe('ScraperService', () => {
  let service: ScraperService;
  let firstArticle: Article;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BrowserModule, SentimentAnalysisModule],
      providers: [ScraperService],
    }).compile();

    service = module.get<ScraperService>(ScraperService);

    const url = 'https://wsa-test.vercel.app/';
    const content = await service.scrape(url);

    firstArticle = content[0];
  }, 15000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('First article properties', () => {
    it('should have correct word count', () => {
      expect(firstArticle.words).toBe(193);
    });

    it('should have the correct category', () => {
      expect(firstArticle.category).toBe('Lifestyle');
    });

    it('should have the correct date', () => {
      expect(firstArticle.date).toBe('September 16, 2023');
    });

    it('should have the correct href', () => {
      expect(firstArticle.href).toBe(
        'https://wsa-test.vercel.app/blog/the-joys-of-gardening',
      );
    });

    it('should have the correct title', () => {
      expect(firstArticle.title).toBe('The Joys of Gardening');
    });

    it('should have the correct short description', () => {
      expect(firstArticle.short_description).toBe(
        'Explore the enriching world of gardening and discover its positive impact on mood and well-being.',
      );
    });

    it('should have the correct sentiment', () => {
      expect(firstArticle.sentiment).toBe(Sentiment.POSITIVE);
    });

    it('should have the correct publisher details', () => {
      expect(firstArticle.publisher).toStrictEqual(
        new Publisher({
          name: 'Alex Green',
          description: 'Gardening Enthusiast',
          image:
            'https://wsa-test.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgardener.60118127.webp&w=2048&q=75',
        }),
      );
    });

    it('should have the correct long description', () => {
      expect(firstArticle.long_description)
        .toBe(`Discover the Blissful Moments in Gardening
Gardening is indeed a joyful and rewarding hobby. It is not just an activity but a form of art that brings happiness and a positive vibe to your surroundings. Let's delve into the serene world of gardening and the plethora of benefits it brings along.
The Amazing Benefits of Gardening
• Positive Mood: Surrounding yourself with beautiful flowers and plants instantly uplifts your mood. The vibrant colors and enchanting fragrances work wonders in driving away negative energies.
• Health Benefits: Engaging in gardening promotes physical health as it involves various activities like digging, planting, and watering.
• Connection with Nature: Gardening fosters a deep connection with nature, offering a sense of satisfaction and peace.
Tips for Beginner Gardeners
If you are a newbie in the gardening world, here are some simple yet effective tips to get you started:
Start with Easy-to-Grow Plants: Opt for plants that are easy to grow and maintain. Some great choices include marigolds, sunflowers, and tomatoes.
Proper Watering: Ensure your plants receive adequate water, but avoid overwatering to prevent root rot.
Pest Control: Learn about organic pest control methods to protect your plants from harmful pests.`);
    });
  });
});
