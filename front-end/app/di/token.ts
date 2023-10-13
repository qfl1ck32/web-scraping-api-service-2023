import { InjectionToken } from "tsyringe";

export const Token = <T>(name: string): InjectionToken<T> => Symbol(name);
