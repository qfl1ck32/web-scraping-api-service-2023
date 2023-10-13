import { injectable } from "tsyringe";

import { AppConfig, IConfigService } from "./config.defs";

@injectable()
export class ConfigService implements IConfigService {
  private config: AppConfig;

  constructor() {
    this.config = {
      apiUrl: process.env.API_URL,
    } as AppConfig;
  }

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.config[key];
  }
}
