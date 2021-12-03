import { GetWssParam } from '@src/types/qqbot-types';
import Session from '@src/client/session/session';
import { EventEmitter } from 'ws';

export default class WebsocketClient extends EventEmitter {
  session!: Session;
  constructor(config: GetWssParam) {
    super();
    this.connect(config);
  }
  // 连接
  async connect(config: GetWssParam) {
    const event = this;
    // 新建一个会话
    this.session = new Session(config, event);
    return this.session;
  }

  // 断开连接
  disconnect() {
    // 关闭会话
    this.session.closeSession();
  }
}
