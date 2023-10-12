import { Test, TestingModule } from '@nestjs/testing';

import { Sentiment } from './sentiment-analysis.defs';
import { SentimentAnalysisService } from './sentiment-analysis.service';

describe('SentimentAnalysisService', () => {
  let service: SentimentAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentAnalysisService],
    }).compile();

    service = module.get<SentimentAnalysisService>(SentimentAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('analyze() - "the joys of gardening"', () => {
    const text = `Discover the Blissful Moments in Gardening
    Gardening is indeed a joyful and rewarding hobby. It is not just an activity but a form of art that brings happiness and a positive vibe to your surroundings. Let's delve into the serene world of gardening and the plethora of benefits it brings along.
    The Amazing Benefits of Gardening
    Positive Mood: Surrounding yourself with beautiful flowers and plants instantly uplifts your mood. The vibrant colors and enchanting fragrances work wonders in driving away negative energies.
    Health Benefits: Engaging in gardening promotes physical health as it involves various activities like digging, planting, and watering.
    Connection with Nature: Gardening fosters a deep connection with nature, offering a sense of satisfaction and peace.
    Tips for Beginner Gardeners
    If you are a newbie in the gardening world, here are some simple yet effective tips to get you started:
    Start with Easy-to-Grow Plants: Opt for plants that are easy to grow and maintain. Some great choices include marigolds, sunflowers, and tomatoes.
    Proper Watering: Ensure your plants receive adequate water, but avoid overwatering to prevent root rot.
    Pest Control: Learn about organic pest control methods to protect your plants from harmful pests.
    `;

    expect(service.analyze(text)).toBe(Sentiment.POSITIVE);
  });

  test('analyze() - "the radiant days of summer"', () => {
    const text = `Embracing the Golden Rays
    Summer is a season full of vibrant and joyful moments. It is the time of year where everything comes alive, showcasing the beauty of nature in its fullest bloom. Let's appreciate the warmth and brightness that summer showers upon us.
    Beautiful Summer Mornings
    Imagine waking up to a bright morning, with a chorus of birds singing and the fresh scent of blooming flowers. It's the perfect time to enjoy outdoor activities and bask in the delightful weather.
    Summer Evenings
    The evenings are just as magnificent, with golden sunsets painting the sky and a pleasant breeze to cool down the day. Summer is undoubtedly a time of wonder and happiness, a season to cherish and embrace with a joyful heart.`;

    expect(service.analyze(text)).toBe(Sentiment.POSITIVE);
  });

  test('analyze() - "challenges of urban living"', () => {
    const text = `Navigating the Urban Jungle
    Living in a bustling city comes with its own set of challenges. The continuous hustle and bustle can sometimes be overwhelming, offering both incredible opportunities and stiff competition. Let's take a closer look at the not-so-rosy aspects of urban life.
    The Downsides of City Living
    Noise Pollution: The constant noise from traffic and construction sites can be a source of distress.
    High Cost of Living: Urban areas often come with a hefty price tag, including high rents and expensive amenities.
    Pollution: Cities are often characterized by high levels of pollution, which can negatively affect your health and well-being.
    Coping Strategies for Urbanites
    Despite the challenges, there are ways to cope with the stresses of city life:
    Creating a Quiet Sanctuary: Make your home a quiet and peaceful sanctuary away from the noise and chaos.
    Community Engagement: Engage with your local community to foster relationships and build support systems.
    Finding Green Spaces: Make an effort to find and spend time in green spaces to reconnect with nature and find moments of calm.
    `;

    expect(service.analyze(text)).toBe(Sentiment.NEGATIVE);
  });

  test('analyze() - "neutral observations on modern art"', () => {
    const text = `A Balanced View on Contemporary Art
    Modern art is a vast and diverse field, encompassing a wide variety of styles, techniques, and themes. It is neither good nor bad; it just is. Let's explore this world without the lenses of prejudice.
    Different Perspectives
    Different people can have vastly different reactions to the same piece of art; what is perceived as a masterpiece by one might be seen as nonsensical by another. It is essential to approach modern art with an open mind.
    The Essence of Modern Art
    The essence of modern art lies in its ability to provoke thought, to challenge established norms, and to encourage viewers to see the world from new and different perspectives. It neither seeks approval nor disapproval, standing firm in its neutrality.`;

    expect(service.analyze(text)).toBe(Sentiment.NEUTRAL);
  });

  test('analyze() - "the disappointing reality of junk food"', () => {
    const text = `The Downside of Fast Food
    In today's fast-paced world, junk food has become a go-to option for many. Despite its convenience and taste, it comes with a plethora of negative effects on our health. Let's delve into why we should avoid falling into the trap of fast-food consumption.
    Health Concerns
    Regular consumption of fast food can lead to numerous health issues, including obesity, heart disease, and diabetes. The high levels of sugar, salt, and unhealthy fats are a recipe for disaster.
    Environmental Impact
    Besides health issues, the fast-food industry also has a significant negative impact on the environment. The massive use of plastic and non-biodegradable materials contributes to pollution and waste, harming our planet in the long run.`;

    expect(service.analyze(text)).toBe(Sentiment.NEGATIVE);
  });
});
