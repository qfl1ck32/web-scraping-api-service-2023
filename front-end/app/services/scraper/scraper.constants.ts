import { Token } from "@app/di/token";
import { use } from "@app/di/use";

import { IScraperService } from "./scraper.defs";

export const SCRAPER_SERVICE_TOKEN = Token<IScraperService>("ScraperService");

export const useScraperService = () => use(SCRAPER_SERVICE_TOKEN);
