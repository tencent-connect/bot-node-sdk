// TODO 补充TS interface
export interface IOpenAPI
  extends Base,
    WebsocketAPI,
    UserAPI,
    MessageAPI,
    GuildAPI,
    ChannelAPI,
    AudioAPI,
    RoleAPI,
    MemberAPI {}

export type APIVersion = number;

export interface Token {
  AppID: number;
  AccessToken: string;
  Type: string;
}

// Base 基础能力接口
export interface Base {
  Version: () => any;
  New: () => any;
  WithTimeout: () => any;
  // WithBody 设置 body，如果 openapi 提供设置 body 的功能，则需要自行识别 body 类型
  WithBody: (body: any) => any;
  // Transport 透传请求，如果 sdk 没有及时跟进新的接口的变更，可以使用该方法进行透传，openapi 实现时可以按需选择是否实现该接口
  Transport: (method: string, url: string, bod: any) => any;
}

// WebsocketAPI websocket 接入地址
export interface WebsocketAPI {
  WS: () => any;
}

// UserAPI 用户相关接口
export interface UserAPI {
  Me: () => any;
  MeGuilds: () => any;
}

// MessageAPI 消息相关接口
export interface MessageAPI {
  Message: () => any;
  Messages: () => any;
  PostMessage: () => any;
}

// GuildAPI guild 相关接口
export interface GuildAPI {
  Guild: () => any;
  GuildMember: () => any;
  GuildMembers: () => any;
  DeleteGuildMember: () => any;
}

// ChannelAPI 频道相关接口
export interface ChannelAPI {
  Channel: () => any;
  Channels: () => any;
  PostChannel: () => any;
  PatchChannel: () => any;
  DeleteChannel: () => any;
}

// AudioAPI 音频接口
export interface AudioAPI {
  PostAudio: () => any;
}

// RoleAPI 用户组相关接口
export interface RoleAPI {
  Roles: () => any;
  PostRole: () => any;
  DeleteRole: () => any;
}

// MemberAPI 成员相关接口，添加成员到用户组等
export interface MemberAPI {
  MemberAddRole: () => any;
  MemberDeleteRole: () => any;
}
