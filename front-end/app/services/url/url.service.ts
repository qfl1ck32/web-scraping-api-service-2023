import { injectable } from "tsyringe";

import { IUrlService } from "./url.defs";

@injectable()
export class UrlService implements IUrlService {
  private pattern: RegExp;

  constructor() {
    this.pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
  }

  public isUrl(str: string) {
    return !!this.pattern.test(str);
  }
}
