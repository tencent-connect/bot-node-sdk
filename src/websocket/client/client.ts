import { GetWssParam, WssAddressObj } from '@src/types/qqbot-types';
import Session from '@src/session/session';
import { EventEmitter } from 'ws';

export default class Client {
  session!: Session;
  constructor(config: GetWssParam, event: any) {
    this.connect(config, event);
  }
  // 连接
  async connect(config: GetWssParam, event: unknown) {
    // const event = new EventEmitter();
    // event.on('Event_From_Server', (data) => {
    //   console.log(`===== 监听触发 ======:`, data);
    // })

    // 新建一个会话
    this.session = new Session(config, event);

    return this.session;
  }

  // 获取频道功能
  getGuild() {
    console.log('Guild频道为: 测试频道');
  }

  // 断开连接
  disconnect() {
    // 关闭会话
    this.session.closeSession();
  }
}
