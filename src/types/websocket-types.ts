import { apiVersion } from '@src/openapi/v1/openapi';
import { getURL } from '@src/openapi/v1/resource';
// websocket建立成功回包
export interface wsResData {
  op: number; // opcode ws的类型
  d?: {
    // 事件内容
    heartbeat_interval?: number; // 心跳时间间隔
  };
  s: number; // 心跳的唯一标识
  t: string; // 事件类型
}

// 发送心跳入参
export interface HeartbeatParam {
  op: number;
  d: number;
}

// 事件分发类型
export interface EventTypes {
  eventType: string;
  eventMsg?: object;
}

// 请求得到ws地址的参数
export interface GetWsParam {
  appID: string;
  token: string;
  shards: Array<number>;
  intents: Array<string>;
}

// 请求ws地址回包对象
export interface WsAddressObj {
  url: string;
  shards: number;
  session_start_limit: {
    total: number;
    remaining: number;
    reset_after: number;
    max_concurrency: number;
  };
}

// ws信息
export interface WsDataInfo {
  data: WsAddressObj;
}

// 会话记录
export interface SessionRecord {
  sessionID: string;
  seq: number;
}

// 心跳参数
export enum OpCode {
  DISPATCH = 0, // 服务端进行消息推送
  HEARTBEAT = 1, // 客户端发送心跳
  IDENTIFY = 2, // 鉴权
  RESUME = 6, // 恢复连接
  RECONNECT = 7, // 服务端通知客户端重连
  INVALID_SESSION = 9, // 当identify或resume的时候，如果参数有错，服务端会返回该消息
  HELLO = 10, // 当客户端与网关建立ws连接之后，网关下发的第一条消息
  HEARTBEAT_ACK = 11, // 当发送心跳成功之后，就会收到该消息
}

// OpenAPI传过来的事件类型
export const WsEventType: { [key: string]: string } = {
  GUILD_CREATE: 'GUILDS', // 频道创建
  GUILD_UPDATE: 'GUILDS', // 频道更新
  GUILD_DELETE: 'GUILDS', // 频道删除
  CHANNEL_CREATE: 'GUILDS', // 子频道创建
  CHANNEL_UPDATE: 'GUILDS', // 子频道更新
  CHANNEL_DELETE: 'GUILDS', // 子频道删除
  GUILD_MEMBER_ADD: 'GUILD_MEMBERS', // 频道成员加入
  GUILD_MEMBER_UPDATE: 'GUILD_MEMBERS', // 频道成员更新
  GUILD_MEMBER_REMOVE: 'GUILD_MEMBERS', // 频道成员移除
  DIRECT_MESSAGE_CREATE: 'DIRECT_MESSAGE', // 当收到用户发给机器人的私信消息时
  AT_MESSAGE_CREATE: 'AT_MESSAGES', // 机器人被@时触发
  AUDIO_START: 'AUDIO_ACTION', // 音频开始播放
  AUDIO_FINISH: 'AUDIO_ACTION', // 音频结束播放
  AUDIO_ON_MIC: 'AUDIO_ACTION', // 机器人上麦
  AUDIO_OFF_MIC: 'AUDIO_ACTION', // 机器人下麦
};

export const WSCodes = {
  1000: 'WS_CLOSE_REQUESTED',
  4004: 'TOKEN_INVALID',
  4010: 'SHARDING_INVALID',
  4011: 'SHARDING_REQUIRED',
  4013: 'INVALID_INTENTS',
  4014: 'DISALLOWED_INTENTS',
};

// websocket错误码
export const enum WebsocketCode {
  INVALID_OPCODE = 4001, // 无效的opcode
  INVALID_PAYLOAD = 4002, // 无效的payload
  ERROR_SEQ = 4007, // seq错误
  TOO_FAST_PAYLOAD = 4008, // 发送 payload 过快，请重新连接，并遵守连接后返回的频控信息
  EXPIRED = 4009, // 连接过期，请重连
  INVALID_SHARD = 4010, // 无效的shard
  TOO_MACH_GUILD = 4011, // 连接需要处理的guild过多，请进行合理分片
  INVALID_VERSION = 4012, // 无效的version
  INVALID_INTENTS = 4013, // 无效的intent
  DISALLOWED_INTENTS = 4014, // intent无权限
  ERROR = 4900, // 内部错误，请重连
}

// websocket错误原因
export const WebsocketCloseReason = [
  {
    code: 4001,
    reason: '无效的opcode',
  },
  {
    code: 4002,
    reason: '无效的payload',
  },
  {
    code: 4007,
    reason: 'seq错误',
  },
  {
    code: 4008,
    reason: '发送 payload 过快，请重新连接，并遵守连接后返回的频控信息',
  },
  {
    code: 4009,
    reason: '连接过期，请重连',
  },
  {
    code: 4010,
    reason: '无效的shard',
  },
  {
    code: 4011,
    reason: '连接需要处理的guild过多，请进行合理分片',
  },
  {
    code: 4012,
    reason: '无效的version',
  },
  {
    code: 4013,
    reason: '无效的intent',
  },
  {
    code: 4014,
    reason: 'intent无权限',
  },
  {
    code: 4900,
    reason: '内部错误，请重连',
  },
];

// 用户输入的intents类型
export const IntentEvents: { [key: string]: number } = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  DIRECT_MESSAGE: 1 << 12,
  AUDIO_ACTION: 1 << 29,
  AT_MESSAGES: 1 << 30,
};

// intents
export const Intents = {
  GUILDS: 0,
  GUILD_MEMBERS: 1,
  GUILD_BANS: 2,
  GUILD_EMOJIS: 3,
  GUILD_INTEGRATIONS: 4,
  GUILD_WEBHOOKS: 5,
  GUILD_INVITES: 6,
  GUILD_VOICE_STATES: 7,
  GUILD_PRESENCES: 8,
  GUILD_MESSAGES: 9,
  GUILD_MESSAGE_REACTIONS: 10,
  GUILD_MESSAGE_TYPING: 11,
  DIRECT_MESSAGES: 12,
  DIRECT_MESSAGE_REACTIONS: 13,
  DIRECT_MESSAGE_TYPING: 14,
};

// Session事件
export const SessionEvents = {
  CLOSED: 'CLOSED',
  READY: 'READY', // 已经可以通信
  ERROR: 'ERROR', // 会话错误
  INVALID_SESSION: 'INVALID_SESSION',
  RECONNECT: 'RECONNECT', // 服务端通知重新连接
  DISCONNECT: 'DISCONNECT', // 断线
  EVENT_WS: 'EVENT_WS', // 内部通信
  RESUMED: 'RESUMED', // 重连
};

// ws地址配置
export const WsObjRequestOptions = {
  method: 'GET' as const,
  url: getURL('wsInfo'),
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'utf-8',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    Connection: 'keep-alive',
    'User-Agent': apiVersion,
    Authorization: '',
  },
};
