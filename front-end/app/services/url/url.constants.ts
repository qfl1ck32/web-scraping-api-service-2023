import { container } from "tsyringe";

import { Token } from "@app/di/token";

import { IUrlService } from "./url.defs";

export const URL_SERVICE_TOKEN = Token<IUrlService>("URL_SERVICE_TOKEN");

export const useUrlService = () => container.resolve(URL_SERVICE_TOKEN);
