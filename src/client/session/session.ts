import { WsObjRequestOptions, EventTypes, SessionEvents, GetWsParam, SessionRecord } from '@src/types/websocket-types';
import { Ws } from '@src/client/websocket/websocket';
import { EventEmitter } from 'ws';
import resty, { RequestOptions } from 'resty-client';

export default class Session {
  config: GetWsParam;
  heartbeatInterval!: number;
  ws!: Ws;
  event!: EventEmitter;
  sessionRecord: SessionRecord | undefined;
  constructor(config: GetWsParam, event: EventEmitter, sessionRecord?: SessionRecord) {
    this.config = config;
    this.event = event;
    // 如果会话记录存在的话，继续透传
    if (sessionRecord) {
      this.sessionRecord = sessionRecord;
    }
    this.creatSession();
  }

  // 新建会话
  async creatSession() {
    this.ws = new Ws(this.config, this.event, this.sessionRecord || undefined);
    // 拿到 ws地址等信息
    WsObjRequestOptions.headers.Authorization = `Bot ${this.config.appID}.${this.config.token}`;
    const wsData = await this.getWsInfo(WsObjRequestOptions);
    // 连接到 ws
    this.ws.createWebsocket(wsData);

    this.event.on(SessionEvents.EVENT_WS, (data: EventTypes) => {
      // 服务端通知重连
      if (data.eventType === SessionEvents.RECONNECT) {
        this.ws.reconnect();
      }
    });
    return this.ws;
  }

  // 关闭会话
  async closeSession() {
    this.ws.closeWs();
  }

  // 拿到 ws地址等信息
  async getWsInfo(options: RequestOptions) {
    const wsService = resty.create(options);
    const wsData: any = {
      data: {},
    };
    await wsService.get(options.url as string, {}).then((res) => {
      wsData.data = res.data;
    });
    return wsData.data;
  }
}
