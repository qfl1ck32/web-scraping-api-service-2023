import { IsUrl } from 'class-validator';

export class ScreenshotDto {
  @IsUrl()
  url: string;
}
