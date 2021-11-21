import { Wss } from '../src/websocket/websocket';
import { GetWssParam, WssAddressObj } from './types/qqbot-types';
import { EventEmitter } from 'ws';

export class Bot {
  client: any;

  // 新建一个连接
  async newClient(config: GetWssParam) {
    this.client = new Wss(config);
    this.client.creat();
    // await this.registHolder(client, config.cached);
    return this.client;
  }

  // 开启监听，用于获取底层服务发来的消息事件
  onmessage() {
    const myEmitter = new EventEmitter();
    myEmitter.on('event', () => {
      console.log('an event occurred!');
    });
    // myEmitter.emit('event');
  }
}
