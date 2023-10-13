import axios from "axios";
import { inject, injectable } from "tsyringe";

import { CONFIG_SERVICE_TOKEN } from "../config/config.constants";
import { ConfigService } from "../config/config.service";

import { IScraperService } from "./scraper.defs";

@injectable()
export class ScraperService implements IScraperService {
  protected apiUrl: string;

  constructor(@inject(CONFIG_SERVICE_TOKEN) config: ConfigService) {
    this.apiUrl = config.get("apiUrl");
  }

  async scrape(url: string): Promise<string> {
    const response = await axios.post(`${this.apiUrl}/scraper`, {
      url,
    });

    return response.data;
  }

  async getScreenshot(url: string): Promise<string> {
    const response = await axios.post(`${this.apiUrl}/browser/screenshot`, {
      url,
    });

    return response.data;
  }
}
