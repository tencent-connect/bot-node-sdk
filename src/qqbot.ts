import { Client } from '../src/websocket/client/client';
import { Wss } from '../src/websocket/websocket';
import { GetWssParam, WssAddressObj } from './types/qqbot-types';
import { HttpsService } from './rest/api-request';

export class QQBot {
  // 新建一个连接
  async newClient(config: GetWssParam) {
    await HttpsService.getWss(config).then(res => {
      console.log(`res: ${res}`);
    })
    // 模拟数据
    const testWss: WssAddressObj = {
      "url": "wss://api.sgroup.qq.com/websocket",
      "shards": 1,
      "session_start_limit": {
        "total": 1000,
        "remaining": 1000,
        "reset_after": 86400000,
        "max_concurrency": 1
      }
    }

    const client = new Wss(testWss, config);
    client.creat();
    // await this.registHolder(client, config.cached);
    return client;
  }

  get() {
    console.log('....aaa....')
  }
};

