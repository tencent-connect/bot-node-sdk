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
    WsObjRequestOptions.headers.Authorization = `Bot ${this.config.appID}.${this.config.token}`;
    this.getWsInfo(WsObjRequestOptions)
      .then(wsData => {
        if (!wsData) throw new Error()
        this.ws.createWebsocket(wsData);
        return this.ws
      }).then(() => {
      this.retry = 0
    }).catch(e => {
      this.event.emit(SessionEvents.EVENT_WS, {
        eventType: SessionEvents.DISCONNECT,
        eventMsg: this.sessionRecord,
        retry: this.retry
      })
    })
    // 连接到 ws
  }

  // 关闭会话
  closeSession() {
    this.ws.closeWs();
  }

  // 拿到 ws地址等信息
  async getWsInfo(options: RequestOptions) {
    return resty.create(options).get(options.url as string, {})
      .then((res) => res.data)
  }
}
