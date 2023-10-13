import "reflect-metadata";

import { container } from "tsyringe";

import { CONFIG_SERVICE_TOKEN } from "@app/services/config/config.constants";
import { ConfigService } from "@app/services/config/config.service";

export const setupDI = () => {
  container.register(CONFIG_SERVICE_TOKEN, { useClass: ConfigService });
};
