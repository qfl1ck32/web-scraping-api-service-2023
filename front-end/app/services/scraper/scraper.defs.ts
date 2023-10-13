export interface IScraperService {
  scrape(url: string): Promise<unknown>;
  getScreenshot(url: string): Promise<any>;
}
