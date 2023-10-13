import "reflect-metadata";

import { container } from "tsyringe";

import { CONFIG_SERVICE_TOKEN } from "@app/services/config/config.constants";
import { ConfigService } from "@app/services/config/config.service";
import { SCRAPER_SERVICE_TOKEN } from "@app/services/scraper/scraper.constants";
import { ScraperService } from "@app/services/scraper/scraper.service";
import { URL_SERVICE_TOKEN } from "@app/services/url/url.constants";
import { UrlService } from "@app/services/url/url.service";

export const setupDI = () => {
  container.register(CONFIG_SERVICE_TOKEN, { useClass: ConfigService });

  container.register(SCRAPER_SERVICE_TOKEN, { useClass: ScraperService });
  container.register(URL_SERVICE_TOKEN, { useClass: UrlService });
};
