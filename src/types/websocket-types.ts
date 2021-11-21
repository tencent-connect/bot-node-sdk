// websocket建立成功回包
export interface wssResData {
  op: number; // opcode wss的类型
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

// wss回包数据

// OpenAPI传过来的事件类型
export enum WsEventType {
  EVENT_GUILD_CREATE = 'GUILD_CREATE', // 频道创建
  EVENT_GUILD_UPDATE = 'GUILD_UPDATE', // 频道更新
  EVENT_GUILD_DELETE = 'GUILD_DELETE', // 频道删除
  EVENT_CHANNEL_CREATE = 'CHANNEL_CREATE', // 子频道创建
  EVENT_CHANNEL_UPDATE = 'CHANNEL_UPDATE', // 子频道更新
  EVENT_CHANNEL_DELETE = 'CHANNEL_DELETE', // 子频道删除
  EVENT_GUILD_MEMBER_ADD = 'GUILD_MEMBER_ADD', // 频道成员加入
  EVENT_GUILD_MEMBER_UPDATE = 'GUILD_MEMBER_UPDATE', // 频道成员更新
  EVENT_GUILD_MEMBER_REMOVE = 'GUILD_MEMBER_REMOVE', // 频道成员移除
  EVENT_MESSAGE_CREATE = 'MESSAGE_CREATE', // 消息创建
  EVENT_AT_MESSAGE_CREATE = 'AT_MESSAGE_CREATE', // 机器人被@时触发
  EVENT_AUDIO_START = 'AUDIO_START', // 音频开始播放
  EVENT_AUDIO_FINISH = 'AUDIO_FINISH', // 音频结束播放
  EVENT_AUDIO_ON_MIC = 'AUDIO_ON_MIC', // 机器人上麦
  EVENT_AUDIO_OFF_MIC = 'AUDIO_OFF_MIC', // 机器人下麦
  READY = 'READY', // 鉴权已通过
}
