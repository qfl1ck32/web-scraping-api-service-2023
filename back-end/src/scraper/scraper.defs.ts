import { ApiProperty } from '@nestjs/swagger';
import * as cheerio from 'cheerio';

export class InnerCardContent {
  longDescription: string;

  constructor(data: InnerCardContent) {
    Object.assign(this, data);
  }
}

export class Publisher {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  constructor(data: Publisher) {
    Object.assign(this, data);
  }
}

export class Article {
  @ApiProperty()
  title: string;

  @ApiProperty()
  short_description: string;

  @ApiProperty()
  long_description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  publisher: Publisher;

  @ApiProperty()
  date: string;

  @ApiProperty()
  href: string;

  @ApiProperty()
  image: string;

  constructor(data: Article) {
    Object.assign(this, data);
  }
}

export type Card = cheerio.Cheerio<cheerio.Element>;
