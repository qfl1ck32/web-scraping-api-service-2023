import { ApiProperty } from '@nestjs/swagger';

export class ScrapedContent {
  @ApiProperty()
  title: string;

  @ApiProperty()
  short_description: string;
}
