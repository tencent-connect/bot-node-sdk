import { OPCodes } from './../utils/constants';
import WebSocket from 'ws';
import { WssAddressObj, GetWssParam } from '../types/qqbot-types';
import { WssParam, OpCode } from '../types/websocket-types';
import { toObject } from '../utils/utils'

// websocket连接
export class Wss {
  ws: any;
  wssData: WssAddressObj;
  config: GetWssParam;
  heartbeatInterval: number;
  constructor(wssData: WssAddressObj, config: GetWssParam) {
    this.wssData = wssData;
    this.config = config;
  }
  // 创建一个websocket连接
  creat() {
    this.ws = new WebSocket(this.wssData.url);

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
        // 开始鉴权
        this.authWss();
        return;
      }
      // 鉴权通过
      if (wssRes.t === 'READY' || wssRes.op === OpCode.HEARTBEAT_ACK) {
        // 第一次发送心跳
        setTimeout( () => {
          console.log(`发送心跳： ${this.heartbeatInterval}`);
          const firstHeartbeat = {
            op: OpCode.HEARTBEAT,
            d: 'test'
          }
          this.ws.send(JSON.stringify(firstHeartbeat));
        }, this.heartbeatInterval)
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

  // 鉴权
  authWss() {
    // 鉴权参数
    const authOp = {
      "op": OpCode.IDENTIFY, // 鉴权参数
      "d": {
        "token": `Bot ${this.config.BotAppID}.${this.config.BotToken}`, // 根据配置转换token
        "intents": 513, // todo 接受的类型
        "shard": [0,4], // 分片信息
        "properties": {
          "$os": "linux",
          "$browser": "my_library",
          "$device": "my_library"
        }
      }
    }
    // 发送鉴权请求
    this.ws.send(JSON.stringify(authOp));
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