import WebSocket from 'ws';
import { WssAddressObj, GetWssParam } from '../types/qqbot-types';
import { WssParam, OpCode } from '../types/websocket-types';
import { toObject } from '../utils/utils';
import { HttpsService } from '../rest/api-request';

// websocket连接
export class Wss {
  ws: any;
  // wssData: WssAddressObj;
  config: GetWssParam;
  heartbeatInterval!: number;
  // 心跳参数，默认为心跳测试
  heartbeatParam = {
    op: OpCode.HEARTBEAT,
    d: 'test',
  };
  // 是否是断线重连，如果是断线重连的话，不需要走鉴权
  isreconnect: boolean;
  constructor(config: GetWssParam) {
    this.config = config;
    this.isreconnect = false;
  }
  // 创建一个websocket连接
  async creat() {
    await this.connectWss();

    // websocket连接已开启
    this.ws.on('open', () => {
      console.log(`[CLIENT] 开启`);
    });

    // 接受消息
    this.ws.on('message', (data: any) => {
      console.log(`[CLIENT] 收到消息: ${data}`);
      // 先将消息解析
      const wssRes = toObject(data);
      // 先判断websocket连接是否成功
      if (wssRes && wssRes?.op === OpCode.HELLO && wssRes?.d?.heartbeat_interval) {
        // websocket连接成功，拿到心跳周期
        this.heartbeatInterval = wssRes?.d?.heartbeat_interval;
        // 非断线重连时，需要鉴权
        if (!this.isreconnect) this.authWss();
        return;
      }

      // 鉴权通过
      if (wssRes.t === 'READY') {
        // 第一次发送心跳
        console.log(`发送第一次心跳： ${this.heartbeatInterval}`);
        this.sendWss(this.heartbeatParam);
      }

      // 心跳测试
      if (wssRes.op === OpCode.HEARTBEAT_ACK) {
        setTimeout(() => {
          console.log(`发送心跳： ${this.heartbeatInterval}`);
          this.sendWss(this.heartbeatParam);
        }, this.heartbeatInterval);
      }

      // 断线重连
      if (wssRes.op === OpCode.RESUME) {
        this.reconnect();
      }
    });

    // websocket关闭
    this.ws.on('onclose', () => {
      console.log(`[CLIENT] 关闭`);
    });

    // websocket错误
    this.ws.on('onerror', () => {
      console.log(`[CLIENT] 错误`);
    });
  }

  // 连接wss
  async connectWss() {
    const wssData = await this.getWss();
    this.ws = new WebSocket(wssData.url);
  }

  // 拿到wss
  async getWss() {
    await HttpsService.getWss(this.config).then((res) => {
      console.log(`res: ${res}`);
    });
    // 模拟数据
    const testWss: WssAddressObj = {
      url: 'wss://api.sgroup.qq.com/websocket',
      shards: 1,
      session_start_limit: {
        total: 1000,
        remaining: 1000,
        reset_after: 86400000,
        max_concurrency: 1,
      },
    };
    return testWss;
  }

  // 鉴权
  authWss() {
    // 鉴权参数
    const authOp = {
      op: OpCode.IDENTIFY, // 鉴权参数
      d: {
        token: `Bot ${this.config.BotAppID}.${this.config.BotToken}`, // 根据配置转换token
        intents: 513, // todo 接受的类型
        shard: [0, 4], // 分片信息
        properties: {
          $os: 'linux',
          $browser: 'my_library',
          $device: 'my_library',
        },
      },
    };
    // 发送鉴权请求
    this.sendWss(authOp);
  }

  // 发送websocket
  sendWss(msg: unknown) {
    try {
      // 先将消息转为字符串
      if (typeof msg === 'string') this.ws.send(msg);
      this.ws.send(JSON.stringify(msg));
    } catch (e) {
      console.log(e);
    }
  }

  // 断线重连
  reconnect() {
    console.log('断线重连');
    this.isreconnect = true;
    this.creat();
  }
}

// const WebSocketClient = require('ws').client;

// const client = new WebSocketClient();

// client.on('connectFailed', function(error) {
//     console.log('Connect Error: ' + error.toString());
// });

// client.on('connect', function(connection) {
//     console.log('WebSocket Client Connected');
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         }
//     });

//     function sendNumber() {
//         if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connection.sendUTF(number.toString());
//             setTimeout(sendNumber, 1000);
//         }
//     }
//     sendNumber();
// });

// client.connect('ws://api.sgroup.qq.com/', 'echo-protocol');
