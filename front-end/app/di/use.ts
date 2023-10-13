import { InjectionToken, container } from "tsyringe";

export function use<T>(token: InjectionToken<T>) {
  return container.resolve(token);
}
