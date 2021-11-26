import WebSocket, { EventEmitter } from 'ws';
import { WssAddressObj, GetWssParam } from '../types/qqbot-types';
import {
  wssResData,
  OpCode,
  SessionEvents,
  WssCloseType,
  WebsocketCode,
  WebsocketCloseReason,
  IntentEvents,
} from '../types/websocket-types';
import { toObject } from '../utils/utils';

// websocket连接
export class Wss {
  ws: any;
  event: any;
  // wssData: WssAddressObj;
  config: GetWssParam;
  heartbeatInterval!: number;
  // 心跳参数，默认为心跳测试
  heartbeatParam = {
    op: OpCode.HEARTBEAT,
    d: null, // 心跳唯一值
  };
  // 是否是断线重连，如果是断线重连的话，不需要走鉴权
  isreconnect: boolean;
  constructor(config: GetWssParam, event: any) {
    this.config = config;
    this.isreconnect = false;
    this.event = event;
  }
  // 创建一个websocket连接
  async creatWebsocket(wssData: WssAddressObj) {
    // 先链接到wss
    await this.connectWss(wssData);
    // 对消息进行监听
    this.creatLstening();
  }
  // 创建监听
  async creatLstening() {
    // websocket连接已开启
    this.ws.on('open', () => {
      console.log(`[CLIENT] 开启`);
    });

    // 接受消息
    this.ws.on('message', (data: wssResData) => {
      // console.log(`[CLIENT] 收到消息: ${data}`);

      // 先将消息解析
      const wssRes = toObject(data);
      // 先判断websocket连接是否成功
      if (wssRes && wssRes?.op === OpCode.HELLO && wssRes?.d?.heartbeat_interval) {
        // websocket连接成功，拿到心跳周期
        this.heartbeatInterval = wssRes?.d?.heartbeat_interval;
        // 非断线重连时，需要鉴权
        this.isreconnect ? this.reconnectWss() : this.authWss();
        return;
      }

      // 鉴权通过
      if (wssRes.t === SessionEvents.READY) {
        console.log(`[CLIENT] 鉴权通过`);
        // 第一次发送心跳
        console.log(`[CLIENT] 发送第一次心跳`, this.heartbeatParam);
        this.sendWss(this.heartbeatParam);
      }

      // 心跳测试
      if (wssRes.op === OpCode.HEARTBEAT_ACK) {
        console.log('[CLIENT] 心跳校验', this.heartbeatParam);
        this.eventMap('1111', wssRes.op);
        setTimeout(() => {
          // console.log(`发送心跳： ${this.heartbeatInterval}`, this.heartbeatParam);
          this.sendWss(this.heartbeatParam);
        }, this.heartbeatInterval);
      }

      // 断线
      if (wssRes.op === OpCode.RESUME) {
        // 通知会话，当前已断线
        this.event.emit('Event_Wss', { eventType: SessionEvents.DISCONNECT });
      }

      // 服务端主动推送的消息
      if (wssRes.op === OpCode.DISPATCH) {
        console.log('[CLIENT] 服务端消息', data);
        // 更新心跳唯一值
        this.heartbeatParam.d = wssRes?.s;
        // OpenAPI事件分发
        this.eventMap(wssRes.t, wssRes.d);
      }
    });

    // 监听websocket关闭事件
    this.ws.on('close', (data: WssCloseType) => {
      console.log('[CLIENT] 连接关闭', data);
      if (data.code) {
        this.wsCloseReason(data.code);
      }
    });

    // 监听websocket错误
    this.ws.on('error', () => {
      console.log(`[CLIENT] 连接错误`);
    });
  }

  // 连接wss
  async connectWss(wssData: WssAddressObj) {
    // 创建websocket连接
    this.ws = new WebSocket(wssData.url);
  }

  // 鉴权
  authWss() {
    // 鉴权参数
    const authOp = {
      op: OpCode.IDENTIFY, // 鉴权参数
      d: {
        token: `Bot ${this.config.BotAppID}.${this.config.BotToken}`, // 根据配置转换token
        intents: this.checkIntents(), // todo 接受的类型
        shard: this.checkShards(this.config.shards) || [0, 2], // 分片信息,给一个默认值
        properties: {
          $os: 'linux',
          $browser: 'my_library',
          $device: 'my_library',
        },
      },
    };
    console.log(`[CLIENT] 开始鉴权`);
    // 发送鉴权请求
    this.sendWss(authOp);
  }

  // 校验intents类型
  checkIntents() {
    // 判断用户有没有给到需要监听的事件类型，暂时开启全部监听
    const intentsIn = ['GUILDS'] as const;
    // const intentsIn = ['GUILDS', 'GUILD_MEMBERS', 'DIRECT_MESSAGE', 'AUDIO_ACTION', 'AT_MESSAGES'] as const;
    if (intentsIn && intentsIn.length > 0) {
      const intents = { value: 0 };
      if (intentsIn.length === 1) {
        intents.value = IntentEvents[intentsIn[0]];
        return intents.value;
      }
      intentsIn.forEach((e) => {
        intents.value = IntentEvents[e] | intents.value;
      });
      return intents.value;
    }
  }

  // 校验shards
  checkShards(shardsArr: Array<number>) {
    // 没有传shards进来
    if (!shardsArr || shardsArr === undefined) {
      return console.log('shards 不存在');
    }
    // 传进来的符合要求
    if (Array.isArray(shardsArr) && shardsArr.length === 2 && shardsArr[0] < shardsArr[1]) {
      return shardsArr;
    }
    return console.log('shards 错误');
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

  // 重新连接
  reconnect() {
    console.log('开始断线重连');
    this.isreconnect = true;
    this.creatLstening();
  }

  // 重新重连Wss
  reconnectWss() {
    const recconectParam = {
      op: OpCode.RESUME,
      d: {
        token: `Bot ${this.config.BotAppID}.${this.config.BotToken}`,
        session_id: 'session_id_i_stored',
        seq: 1337,
      },
    };
    this.sendWss(recconectParam);
  }

  // OpenAPI事件分发
  eventMap(eventType: string, eventMsg: unknown) {
    this.event.emit('Event_Wss', { eventType, eventMsg });
  }

  // 主动关闭会话
  closeWs() {
    this.ws.close();
  }

  // ws关闭的原因
  wsCloseReason(code: number) {
    WebsocketCloseReason.forEach((e) => {
      if (e.code === code) {
        console.log(`[websokect] 连接错误`, e.reason);
      }
    });
  }
}
