import { AudioControl } from '@src/openapi/v1/audio';
import { GuildRes } from '@src/openapi/v1/guild';

export interface Options {
  method:
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'options'
    | 'OPTIONS'
    | 'patch'
    | 'PATCH'
    | 'head'
    | 'HEAD';
  url: string;
  path: Object;
  headers: Object;
  data?: Object;
  parameters?: Object;
  requestConfig?: Object;
  responseConfig?: Object;
}
export interface Config {
  appID: string;
  token: string;
  timeout?: number;
}

// TODO 补充TS interface
export interface IOpenAPI {
  config: Config;
  request: (options: Options) => Promise<any>;
  guildApi: GuildAPI;
}

export type APIVersion = `v${number}`;

export interface Token {
  appID: number;
  accessToken: string;
  type: string;
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
