import { register } from '@src/openapi/openapi';
import { Config, GuildAPI, IOpenAPI, MeAPI } from '@src/types/openapi';
import resty, { RequestOptions, RestyResponse } from 'resty-client';
import Guild from './guild';
import Me from './me';

export const apiVersion = 'v1';

export class OpenAPI implements IOpenAPI {
  static newClient(config: Config) {
    const client = new OpenAPI(config);
    return client;
  }

  config: Config = {
    appID: '',
    token: '',
  };
  guildApi!: GuildAPI;
  meApi!: MeAPI;
  constructor(config: Config) {
    this.config = config;
    this.register(this);
  }

  public register(client: IOpenAPI) {
    // 注册聚合client
    client.guildApi = new Guild(this.request, this.config);
    client.meApi = new Me(this.request, this.config);
  }
  // 基础rest请求
  public request<T extends Record<any, any> = any>(options: RequestOptions): Promise<RestyResponse<T>> {
    const { appID, token } = this.config;
    options.headers = {
      ...options.headers,
      'User-Agent': 'v1',
      Authorization: `Bot ${appID}.${token}`,
    };
    // TODO resty-client提供中间件注册机制 用于调试
    const client = resty.create(options);
    return client.request<T>(options.url!, options);
  }
}

export function v1Setup() {
  register(apiVersion, OpenAPI);
}
