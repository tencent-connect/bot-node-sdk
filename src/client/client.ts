import {GetWsParam, SessionEvents, SessionRecord, WebsocketCloseReason} from '@src/types/websocket-types';
import Session from '@src/client/session/session';
import {EventEmitter} from 'ws';
import {indexOf} from "@src/utils/utils";

const MAX_RETRY = 5

export default class WebsocketClient extends EventEmitter {
  session!: Session;
  retry = 0

  constructor(config: GetWsParam) {
    super();
    this.connect(config);

    this.on(SessionEvents.EVENT_WS, (data) => {
      switch (data.eventType) {
        case SessionEvents.RECONNECT:
          console.log('[CLIENT] 等待断线重连中。。。');
          break;
        case SessionEvents.DISCONNECT:
          if (this.retry < (config.maxRetry || MAX_RETRY)) {
            console.log('[CLIENT] 重新连接中，尝试次数：', (this.retry + 1));
            this.connect(config,
              WebsocketCloseReason[indexOf(WebsocketCloseReason, data, "code")]?.resume ? data.eventMsg : null)
            this.retry += 1
          } else {
            console.log('[CLIENT] 摆烂了，不连了');
            this.emit(SessionEvents.DEAD, {eventType: SessionEvents.ERROR, msg: "连接已死亡，请检查网络或重启"})
          }
          break;
        case SessionEvents.READY:
          console.log('[CLIENT] 连接成功');
          this.retry = 0;
          break;
        default:
      }
    })
  }

  // 连接
  connect(config: GetWsParam, sessionRecord?: SessionRecord) {
    const event = this;
    // 新建一个会话
    this.session = new Session(config, event, sessionRecord);
    return this.session;
  }

  // 断开连接
  disconnect() {
    // 关闭会话
    this.session.closeSession();
  }
}
