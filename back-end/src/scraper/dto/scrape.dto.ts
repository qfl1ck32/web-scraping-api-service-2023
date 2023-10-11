import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ScrapeDto {
  @IsUrl()
  @ApiProperty()
  url: string;
}
