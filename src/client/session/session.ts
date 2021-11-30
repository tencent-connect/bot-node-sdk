import { WssAddressObj, GetWssParam } from '@src/types/qqbot-types';
import { Wss } from '@src/client/websocket/websocket';
import { SessionEvents, EventTypes, WssObjRequestOptions } from '@src/types/websocket-types';
import resty, { RestyResponse } from 'resty-client';
import { EventEmitter } from 'ws';

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
    // 监听会话事件
    // this.onmessage();
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
    // 模拟数据
    // const testWss: WssAddressObj = {
    //   url: 'wss://api.sgroup.qq.com/websocket',
    //   shards: 1,
    //   session_start_limit: {
    //     total: 1000,
    //     remaining: 1000,
    //     reset_after: 86400000,
    //     max_concurrency: 1,
    //   },
    // };
    // return testWss;
  }
}
