import { register } from '@src/openapi/openapi';
import Client from 'node-rest-client'; // REST API client from node.js
import Guild from './guild';

export const apiVersion = 1;

export interface Options {
  method:
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'options'
    | 'OPTIONS'
    | 'patch'
    | 'PATCH'
    | 'head'
    | 'HEAD';
  url: string;
  path: Object;
  headers: Object;
  data?: Object;
  parameters?: Object;
  requestConfig?: Object;
  responseConfig?: Object;
}
export interface Config {
  appID: string;
  token: string;
  timeout?: number;
}
// TODO 全部的聚合API
class OpenAPI {
  static async newClient(config = {}) {
    const client = new OpenAPI(config as any);
    return client;
  }

  config: Config = {
    appID: '',
    token: '',
    timeout: 3000,
  };
  constructor(config: Config) {
    this.config = config;
    this.register(this);
  }

  async register(client: any) {
    // 注册聚合client
    const guildAPI = new Guild(this.request);
    client = { ...client, ...guildAPI };
  }
  request(options: Options) {
    const client = new Client();
    const { appID, token, timeout } = this.config;
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
      client[options.method](options.url, options, (data: any) => {
        resolve([data, null]);
      });
    });
  }
}

export function v1Setup() {
  register(apiVersion, OpenAPI.newClient() as any);
}
