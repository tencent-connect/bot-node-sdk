import { IBase } from '@src/types/openapi';
// TODO 后面替换或者重构维护这块
import { Client } from 'node-rest-client';

// token := token.BotToken(conf.AppID, conf.Token)
// api := botgo.NewOpenAPI(token).WithTimeout(3 * time.Second)

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
}
export default class Base implements IBase {
  token = '';
  timeout = 0;
  body = {};
  sandbox = false;
  debug = false;
  withTimeout() {}
  withBody() {}
  transport() {}
  version() {}
  request(options: Options) {
    const client = new Client();
    options.headers = { ...options.headers, 'User-Agent': 'v1' };
    client[options.method](options.url, options);
  }
  respInfo() {}
}
