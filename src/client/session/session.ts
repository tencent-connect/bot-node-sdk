import {EventTypes, GetWsParam, SessionEvents, SessionRecord, WsObjRequestOptions} from '@src/types/websocket-types';
import {Ws} from '@src/client/websocket/websocket';
import {EventEmitter} from 'ws';
import resty, {RequestOptions} from 'resty-client';

const RETRY = 5

export default class Session {
  config: GetWsParam;
  heartbeatInterval!: number;
  ws!: Ws;
  event!: EventEmitter;
  sessionRecord: SessionRecord | undefined;

  retry = 0

  constructor(config: GetWsParam, event: EventEmitter, sessionRecord?: SessionRecord) {
    this.config = config;
    this.event = event;
    // 如果会话记录存在的话，继续透传
    if (sessionRecord) {
      this.sessionRecord = sessionRecord;
    }
    this.initEventEmitter()
    this.createSession()
  }

  onDisConnect(data: EventTypes) {
    if (this.retry < RETRY) {
      console.log('[CLIENT] 断线重连 尝试次数：', ++this.retry);
      // 传入会话记录
      this.sessionRecord = data.eventMsg as SessionRecord
      this.createSession()
    } else {
      console.log('[CLIENT] 超过重试次数，断开连接');
    }
  }

  initEventEmitter() {
    this.event.on(SessionEvents.EVENT_WS, (data: EventTypes) => {
      // 服务端通知重连
      switch (data.eventType) {
        case SessionEvents.RECONNECT:
          this.ws.reconnect();
          break;
        case SessionEvents.DISCONNECT:
          this.onDisConnect(data)
          break;
        default:
      }
    });
  }

  // 新建会话
  createSession() {
    this.ws = new Ws(this.config, this.event, this.sessionRecord || undefined);
    // 拿到 ws地址等信息
    const reqOptions = WsObjRequestOptions(this.config.sandbox)
    reqOptions.headers.Authorization = `Bot ${this.config.appID}.${this.config.token}`;
    resty.create(reqOptions)
      .get(reqOptions.url as string, {})
      .then(r => {
        const wsData = r.data
        if (!wsData) throw new Error()
        this.ws.createWebsocket(wsData);
        this.retry = 0
      }).catch(e => {
      console.log('[ERROR] createSession: ', e)
      this.event.emit(SessionEvents.EVENT_WS, {
        eventType: SessionEvents.DISCONNECT,
        eventMsg: this.sessionRecord
      })
    })
  }

  // 关闭会话
  closeSession() {
    this.ws.closeWs();
  }
}
