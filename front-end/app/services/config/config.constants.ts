import { Token } from "@app/di/token";

import { IConfigService } from "./config.defs";

export const CONFIG_SERVICE_TOKEN = Token<IConfigService>("CONFIG_TOKEN");
