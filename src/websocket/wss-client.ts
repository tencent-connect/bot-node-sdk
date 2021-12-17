import { GetWssParam } from '@src/types/qqbot-types';
import { EventEmitter } from 'ws';
import Client from './client/client';
import { EventTypes } from '@src/types/websocket-types';

export class WssClient {
  client!: Client;
  event!: EventEmitter;
  constructor(config: GetWssParam) {
    this.newWsClient(config);
  }
  // 新建一个连接
  async newWsClient(config: GetWssParam) {
    // 事件监听
    this.event = new EventEmitter();
    // 构造连接
    this.client = new Client(config, this.event);
    return this.client;
  }

  // 开启监听，用于获取底层服务发来的消息事件
  onmessage() {
    this.event.on('Event_Wss', (data: EventTypes) => {
      console.log(`===== 监听触发 ======:`, data);
    });
  }

  getGuild() {
    this.client.getGuild();
  }
}
