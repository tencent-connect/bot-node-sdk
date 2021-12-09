import { GetWsParam, EventTypes, SessionEvents, SessionRecord } from '@src/types/websocket-types';
import Session from '@src/client/session/session';
import { EventEmitter } from 'ws';

export default class WebsocketClient extends EventEmitter {
  session!: Session;
  constructor(config: GetWsParam) {
    super();
    this.connect(config);
  }
  // 连接
  async connect(config: GetWsParam) {
    const event = this;
    // 新建一个会话
    this.session = new Session(config, event);
    event.on(SessionEvents.EVENT_WS, (data: EventTypes) => {
      // 断线重连
      if (data.eventType === SessionEvents.DISCONNECT) {
        console.log('[CLIENT] 断线重连');
        // 传入会话记录
        this.session = new Session(config, event, data.eventMsg as SessionRecord);
      }
    });
    return this.session;
  }

  // 断开连接
  disconnect() {
    // 关闭会话
    this.session.closeSession();
  }
}
