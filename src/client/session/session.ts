import { GetWssParam } from '@src/types/qqbot-types';
import { Wss } from '@src/client/websocket/websocket';
import { WssObjRequestOptions, EventTypes, SessionEvents } from '@src/types/websocket-types';
import resty from 'resty-client';

export default class Session {
  config: GetWssParam;
  heartbeatInterval!: number;
  wss!: Wss;
  event: any;
  constructor(config: GetWssParam, event: unknown) {
    this.config = config;
    this.event = event;
    this.creatSession();
  }

  // 新建会话
  async creatSession() {
    this.wss = new Wss(this.config, this.event);
    // 拿到 wss地址等信息
    const wssData = await this.getWss(WssObjRequestOptions);
    // 连接到 wss
    this.wss.creatWebsocket(wssData);

    this.event.on('Event_Wss', (data: EventTypes) => {
      // 断线重连
      if (data.eventType === SessionEvents.DISCONNECT) {
        console.log('监听到断线，发消息需要重连');
        this.wss.reconnect();
      }
    });
    return this.wss;
  }

  // 关闭会话
  async closeSession() {
    this.wss.closeWs();
  }

  // 拿到 wss地址等信息
  async getWss(options: any) {
    const wssService = resty.create(options);
    const wssData: any = {
      data: {},
    };
    await wssService.get(options.url, {}).then((res) => {
      wssData.data = res.data;
    });
    return wssData.data;
  }
}
