import { AudioControl } from '@src/openapi/v1/audio';
import { GuildRes } from '@src/openapi/v1/guild';

// TODO 补充TS interface
export interface IOpenAPI
  extends IBase,
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
  appID: number;
  accessToken: string;
  type: string;
}

// Base 基础能力接口
export interface IBase {
  token: any;
  timeout: number;
  body: any;
  sandbox: boolean;
  debug: boolean;
  version: () => any;
  // new: () => any;
  withTimeout: () => any;
  // WithBody 设置 body，如果 openapi 提供设置 body 的功能，则需要自行识别 body 类型
  withBody: (body: any) => any;
  // Transport 透传请求，如果 sdk 没有及时跟进新的接口的变更，可以使用该方法进行透传，openapi 实现时可以按需选择是否实现该接口
  transport: (method: string, url: string, bod: any) => any;
}

// WebsocketAPI websocket 接入地址
export interface WebsocketAPI {
  ws: () => any;
}

// UserAPI 用户相关接口
export interface UserAPI {
  me: () => any;
  meGuilds: () => any;
}

// MessageAPI 消息相关接口
export interface MessageAPI {
  message: () => any;
  messages: () => any;
  postMessage: () => any;
}

// GuildAPI guild 相关接口
export interface GuildAPI {
  guild: (guildID: string) => Promise<GuildRes>;
  guildMember: () => any;
  guildMembers: () => any;
  deleteGuildMember: () => any;
}

// ChannelAPI 频道相关接口
export interface ChannelAPI {
  channel: () => any;
  channels: () => any;
  postChannel: () => any;
  patchChannel: () => any;
  deleteChannel: () => any;
}

// AudioAPI 音频接口
export interface AudioAPI {
  postAudio: (channelID: string, value: AudioControl) => any;
}

// RoleAPI 用户组相关接口
export interface RoleAPI {
  roles: () => any;
  postRole: () => any;
  deleteRole: () => any;
}

// MemberAPI 成员相关接口，添加成员到用户组等
export interface MemberAPI {
  memberAddRole: () => any;
  memberDeleteRole: () => any;
}
