import { GetWsParam, SessionEvents, SessionRecord, WsObjRequestOptions } from '@src/types/websocket-types';
import { Ws } from '@src/client/websocket/websocket';
import { EventEmitter } from 'ws';
import resty from 'resty-client';
import { addAuthorization } from '@src/utils/utils';
import { BotLogger } from '@src/utils/logger';

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
    this.createSession();
  }

  // 新建会话
  createSession() {
    this.ws = new Ws(this.config, this.event, this.sessionRecord || undefined);
    // 拿到 ws地址等信息
    const reqOptions = WsObjRequestOptions(this.config.sandbox as boolean);

    addAuthorization(reqOptions.headers, this.config.appID, this.config.token);

    resty
      .create(reqOptions)
      .get(reqOptions.url as string, {})
      .then((r) => {
        const wsData = r.data;
        if (!wsData) throw new Error('获取ws连接信息异常');
        this.ws.createWebsocket(wsData);
      })
      .catch((e) => {
        BotLogger.info('[ERROR] createSession: ', e);
        this.event.emit(SessionEvents.EVENT_WS, {
          eventType: SessionEvents.DISCONNECT,
          eventMsg: this.sessionRecord,
        });
      });
  }

  // 关闭会话
  closeSession() {
    this.ws.closeWs();
  }
}
