import {
  wsResData,
  OpCode,
  SessionEvents,
  WebsocketCloseReason,
  IntentEvents,
  WsEventType,
  WsAddressObj,
  GetWsParam,
  SessionRecord,
} from '@src/types/websocket-types';
import WebSocket, { EventEmitter } from 'ws';
import { toObject } from '@src/utils/utils';
import { Properties } from '@src/utils/constants';

// websocket连接
export class Ws {
  ws!: WebSocket;
  event!: EventEmitter;
  config: GetWsParam;
  heartbeatInterval!: number;
  // 心跳参数，默认为心跳测试
  heartbeatParam = {
    op: OpCode.HEARTBEAT,
    d: null, // 心跳唯一值
  };
  // 是否是断线重连，如果是断线重连的话，不需要走鉴权
  isReconnect: boolean;
  // 记录会话参数
  sessionRecord = {
    sessionID: '',
    seq: 0,
  };
  constructor(config: GetWsParam, event: EventEmitter, sessionRecord?: SessionRecord) {
    this.config = config;
    this.isReconnect = false;
    this.event = event;
    // 如果是重连，则拿到重新的会话记录，然后进入重连步骤
    if (sessionRecord) {
      this.sessionRecord.sessionID = sessionRecord.sessionID;
      this.sessionRecord.seq = sessionRecord.seq;
      this.isReconnect = true;
    }
  }
  // 创建一个websocket连接
  async createWebsocket(wsData: WsAddressObj) {
    // 先链接到ws
    await this.connectWs(wsData);
    // 对消息进行监听
    this.createListening();
  }
  // 创建监听
  async createListening() {
    // websocket连接已开启
    this.ws.on('open', () => {
      console.log(`[CLIENT] 开启`);
    });

    // 接受消息
    this.ws.on('message', (data: wsResData) => {
      // console.log(`[CLIENT] 收到消息: ${data}`);

      // 先将消息解析
      const wsRes = toObject(data);
      // 先判断websocket连接是否成功
      if (wsRes?.op === OpCode.HELLO && wsRes?.d?.heartbeat_interval) {
        // websocket连接成功，拿到心跳周期
        this.heartbeatInterval = wsRes?.d?.heartbeat_interval;
        // 非断线重连时，需要鉴权
        this.isReconnect ? this.reconnectWs() : this.authWs();
        return;
      }

      // 鉴权通过
      if (wsRes.t === SessionEvents.READY) {
        console.log(`[CLIENT] 鉴权通过`);
        const { d, s } = wsRes;
        const { session_id } = d;
        // 获取当前会话参数
        if (session_id && s) {
          this.sessionRecord.sessionID = session_id;
          this.sessionRecord.seq = s;
          this.heartbeatParam.d = s;
        }
        this.event.emit(SessionEvents.READY, { eventType: SessionEvents.READY, msg: d || '' });
        // 第一次发送心跳
        console.log(`[CLIENT] 发送第一次心跳`, this.heartbeatParam);
        this.sendWs(this.heartbeatParam);
        return;
      }

      // 心跳测试
      if (wsRes.op === OpCode.HEARTBEAT_ACK || wsRes.t === SessionEvents.RESUMED) {
        console.log('[CLIENT] 心跳校验', this.heartbeatParam);
        setTimeout(() => {
          this.sendWs(this.heartbeatParam);
        }, this.heartbeatInterval);
      }

      // 收到服务端锻炼重连的通知
      if (wsRes.op === OpCode.RECONNECT) {
        // 通知会话，当前已断线
        this.event.emit(SessionEvents.EVENT_WS, { eventType: SessionEvents.RECONNECT });
      }

      // 服务端主动推送的消息
      if (wsRes.op === OpCode.DISPATCH) {
        // 更新心跳唯一值
        const { s } = wsRes;
        if (s) {
          this.sessionRecord.seq = s;
          this.heartbeatParam.d = s;
        }
        // OpenAPI事件分发
        this.dispatchEvent(wsRes.t, wsRes);
      }
    });

    // 监听websocket关闭事件
    this.ws.on('close', (data: number) => {
      console.log('[CLIENT] 连接关闭', data);
      // 通知会话，当前已断线
      this.event.emit(SessionEvents.EVENT_WS, { eventType: SessionEvents.DISCONNECT, eventMsg: this.sessionRecord });
      if (data) {
        this.handleWsCloseEvent(data);
      }
    });

    // 监听websocket错误
    this.ws.on('error', () => {
      console.log(`[CLIENT] 连接错误`);
      this.event.emit(SessionEvents.CLOSED, { eventType: SessionEvents.CLOSED });
    });
  }

  // 连接ws
  async connectWs(wsData: WsAddressObj) {
    // 创建websocket连接
    this.ws = new WebSocket(wsData.url);
  }

  // 鉴权
  authWs() {
    // 鉴权参数
    const authOp = {
      op: OpCode.IDENTIFY, // 鉴权参数
      d: {
        token: `Bot ${this.config.appID}.${this.config.token}`, // 根据配置转换token
        intents: this.getValidIntents(), // todo 接受的类型
        shard: this.checkShards(this.config.shards) || [0, 1], // 分片信息,给一个默认值
        properties: {
          $os: Properties.os,
          $browser: Properties.browser,
          $device: Properties.device,
        },
      },
    };
    // 发送鉴权请求
    this.sendWs(authOp);
  }

  // 校验intents类型
  getValidIntents() {
    // 判断用户有没有给到需要监听的事件类型
    const intentsIn = this.getValidIntentsType();
    if (intentsIn.length > 0) {
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

  // 校验intents格式
  getValidIntentsType() {
    const intentsIn = this.config.intents;
    // 全部可监听事件
    const defaultIntents = ['GUILDS', 'GUILD_MEMBERS', 'DIRECT_MESSAGE', 'AUDIO_ACTION', 'AT_MESSAGES'];
    // 如果开发者没传intents，我们默认给他开启全部监听事件
    if (!intentsIn) {
      console.log('[CLIENT] intents不存在，默认开启全部监听事件');
      return defaultIntents;
    }
    // 如果开发者传入intents为空数组，我们默认给他开启全部监听事件
    if (intentsIn.length === 0) {
      console.log('[CLIENT] intents为空，默认开启全部监听事件');
      return defaultIntents;
    }
    // 如果intents大于可监听数
    if (intentsIn.length > defaultIntents.length) {
      console.log('[CLIENT] intents中的监听事件大于可监听数，仅开启有效监听事件');
    }
    // 如果intents中数据格式不对
    const typeIn = intentsIn.every((item) => typeof item === 'string');
    if (!typeIn) {
      console.log('[CLIENT] intents中存在不合法类型，仅开启有效监听事件');
      const intentsArr = intentsIn.filter((item) => typeof item === 'string');
      return intentsArr;
    }
    return intentsIn;
  }

  // 校验shards
  checkShards(shardsArr: Array<number> | undefined) {
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
  sendWs(msg: unknown) {
    try {
      // 先将消息转为字符串
      if (typeof msg === 'string') return this.ws.send(msg);
      this.ws.send(JSON.stringify(msg));
    } catch (e) {
      console.log(e);
    }
  }

  // 重新连接
  reconnect() {
    console.log('[CLIENT] 开始断线重连');
    this.isReconnect = true;
    // 断线后需要 1s后再重新连接
    setTimeout(() => {
      this.createListening();
    }, 1000);
  }

  // 重新重连Ws
  reconnectWs() {
    const recconectParam = {
      op: OpCode.RESUME,
      d: {
        token: `Bot ${this.config.appID}.${this.config.token}`,
        session_id: this.sessionRecord.sessionID,
        seq: this.sessionRecord.seq,
      },
    };
    this.sendWs(recconectParam);
  }

  // OpenAPI事件分发
  dispatchEvent(eventType: string, wsRes: wsResData) {
    const msg = wsRes.d;
    // 如果没有事件，即刻退出
    if (!msg || !eventType) return;
    this.event.emit(WsEventType[eventType], { eventType, msg });
  }

  // 主动关闭会话
  closeWs() {
    this.ws.close();
  }

  // ws关闭的原因
  handleWsCloseEvent(code: number) {
    WebsocketCloseReason.forEach((e) => {
      if (e.code === code) {
        this.event.emit(SessionEvents.ERROR, { eventType: SessionEvents.ERROR, msg: e.reason });
      }
    });
  }
}
