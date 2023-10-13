export interface IScraperService {
  scrape(url: string): Promise<unknown>;
}
