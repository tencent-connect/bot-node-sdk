import { register } from '@src/openapi/openapi';
import { Config, GuildAPI, IOpenAPI, Options } from '@src/types/openapi';
import { Client } from 'node-rest-client'; // REST API client from node.js
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
  public request(options: Options): Promise<any> {
    const { appID, token, timeout } = this.config;
    const client = new Client();
    options.headers = {
      ...options.headers,
      'User-Agent': 'v1',
      Authorization: `Bot ${appID}.${token}`,
    };
    options.requestConfig = {
      timeout,
    };
    options.responseConfig = {
      timeout,
    };
    return new Promise((resolve, reject) => {
      // TODO catch处理
      client[options.method.toLocaleLowerCase()](options.url, options, (data: any, response: any) => {
        // 调试
        if (process.env.NODE_ENV === 'dev') {
          console.log('options', options);
        }
        resolve([data, null]);
      });
    });
  }
}

export function v1Setup() {
  register(apiVersion, OpenAPI);
}
