import { GetWssParam, WssAddressObj } from '@src/types/qqbot-types';
import Session from '@src/session/session';
import { EventEmitter } from 'ws';

export default class Client {
  client: any;

  // 连接
  async connect(config: GetWssParam, event: unknown) {
    // const event = new EventEmitter();
    // event.on('Event_From_Server', (data) => {
    //   console.log(`===== 监听触发 ======:`, data);
    // })

    // 新建一个会话
    this.client = new Session(config, event);
    this.client.creatSession();

    return this.client;
  }

  // 获取频道功能
  getGuild() {
    console.log('Guild频道为: 测试频道');
  }

  // 销毁
  destroy() {}

  // 断开连接
  disconnect() {
    this.destroy();
  }
}
