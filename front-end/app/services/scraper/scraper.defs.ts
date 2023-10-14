export interface IScraperService {
  scrape(url: string): Promise<unknown>;
  getScreenshot(url: string): Promise<string>;
  downloadJson(data: unknown, filename: string): void;
}
