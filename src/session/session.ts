import { HttpsService } from '@src/rest/api-request';
import { WssAddressObj, GetWssParam } from '@src/types/qqbot-types';
import { Wss } from '@src/websocket/websocket';
import { SessionEvents, EventTypes } from '@src/types/websocket-types';

export default class Session {
  // wssData: WssAddressObj;
  config: GetWssParam;
  heartbeatInterval!: number;
  wss!: Wss;
  event: any;
  constructor(config: GetWssParam, event: any) {
    this.config = config;
    this.event = event;
    this.creatSession();
  }

  // 新建会话
  async creatSession() {
    this.wss = new Wss(this.config, this.event);
    // 拿到 wss地址等信息
    const wssData = await this.getWss();
    // 连接到 wss
    this.wss.creatWebsocket(wssData);
    // 监听会话事件
    this.onmessage();
    return this.wss;
  }

  // 监听会话事件，用于处理断线重连
  onmessage() {
    console.log('监听会话事件，用于处理断线重连');
    this.event.on('Event_Wss', (data: EventTypes) => {
      // 断线了，需要重新连接
      if (data.eventType === SessionEvents.DISCONNECT) {
        this.wss.reconnect();
      }
    });
  }

  // 关闭会话
  async closeSession() {
    this.wss.closeWs();
  }

  // 拿到 wss地址等信息
  async getWss() {
    await HttpsService.getWss(this.config).then((res) => {
      // console.log(`res: ${res}`);
    });
    // 模拟数据
    const testWss: WssAddressObj = {
      url: 'wss://api.sgroup.qq.com/websocket',
      shards: 1,
      session_start_limit: {
        total: 1000,
        remaining: 1000,
        reset_after: 86400000,
        max_concurrency: 1,
      },
    };
    return testWss;
  }
}
