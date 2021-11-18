import { Wss } from '../src/websocket/websocket';
import { GetWssParam, WssAddressObj } from './types/qqbot-types';

export class QQBot {
  static get() {
    console.log('....aaa....');
  }
  // 新建一个连接
  async newClient(config: GetWssParam) {
    const client = new Wss(config);
    client.creat();
    // await this.registHolder(client, config.cached);
    return client;
  }
}
