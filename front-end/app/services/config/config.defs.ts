export type AppConfig = {
  apiUrl: string;
};

export interface IConfigService {
  get<T extends keyof AppConfig>(key: T): AppConfig[T];
}
