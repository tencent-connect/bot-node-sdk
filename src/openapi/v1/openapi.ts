import { register } from '@src/openapi/openapi';
import { Config, GuildAPI, IOpenAPI } from '@src/types/openapi';
import resty, { RestyResponse } from 'resty-client';
import Guild from './guild';

export const apiVersion = 'v1';

export class OpenAPI implements IOpenAPI {
  static newClient(config: Config) {
    const client = new OpenAPI(config);
    return client;
  }

  config: Config = {
    appID: '',
    token: '',
    timeout: 3000,
  };
  guildApi!: GuildAPI;
  constructor(config: Config) {
    this.config = config;
    this.register(this);
  }

  public register(client: any) {
    // 注册聚合client
    const guildApi = new Guild(this.request, this.config);
    client.guildApi = guildApi;
  }
  // 基础rest请求
  public request<T extends Record<any, any> = any>(options: any): Promise<RestyResponse<T>> {
    const { appID, token, timeout } = this.config;
    options.headers = {
      ...options.headers,
      'User-Agent': 'v1',
      Authorization: `Bot ${appID}.${token}`,
    };
    const client = resty.create(options);
    return client.request<T>(options.url, options);
  }
}

export function v1Setup() {
  register(apiVersion, OpenAPI);
}
