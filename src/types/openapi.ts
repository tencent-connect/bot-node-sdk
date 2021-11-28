import { AudioControl } from '@src/openapi/v1/audio';
import { IChannelPermissions, UpdateChannelPermissions } from '@src/openapi/v1/channel-permissions';
import DirectMessage, { DirectMessageToCreate, IDirectMessage } from '@src/openapi/v1/direct-message';
import { IGuild, IMember } from '@src/openapi/v1/guild';
import { ChannelValueObject, IChannel } from '@src/openapi/v1/member';
import { IMessage, IUser, MessagesPager, MessageToCreate } from '@src/openapi/v1/message';
import { GuildRoles, IRole } from '@src/openapi/v1/role';
import { RequestOptions, RestyResponse } from 'resty-client';

export type OpenAPIRequest = <T extends Record<any, any> = any>(options: RequestOptions) => Promise<RestyResponse<T>>;

export interface Config {
  appID: string;
  token: string;
  timeout?: number;
}

export interface IOpenAPI {
  config: Config;
  request: OpenAPIRequest;
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
export interface MeAPI {
  me: () => Promise<RestyResponse<IUser>>;
  meGuilds: () => Promise<RestyResponse<IGuild[]>>;
}

// MessageAPI 消息相关接口
export interface MessageAPI {
  message: (channelID: string, messageID: string) => Promise<RestyResponse<IMessage>>;
  messages: (channelID: string, pager: MessagesPager) => Promise<RestyResponse<IMessage[]>>;
  postMessage: (channelID: string, message: MessageToCreate) => Promise<RestyResponse<IMessage>>;
}

// GuildAPI guild 相关接口
export interface GuildAPI {
  guild: (guildID: string) => Promise<RestyResponse<IGuild>>;
  guildMember: (guildID: string, userID: string) => Promise<RestyResponse<IMember>>;
  guildMembers: (guildID: string) => Promise<RestyResponse<IMember[]>>;
  deleteGuildMember: (guildID: string, userID: string) => Promise<RestyResponse<any>>;
}

// ChannelAPI 频道相关接口
export interface ChannelAPI {
  channel: (channelID: string) => Promise<RestyResponse<IChannel>>;
  channels: (guildID: string) => Promise<RestyResponse<IChannel[]>>;
  postChannel: (guildID: string, channel: ChannelValueObject) => Promise<RestyResponse<IChannel>>;
  patchChannel: (guildID: string, channel: ChannelValueObject) => Promise<RestyResponse<IChannel>>;
  deleteChannel: (channelID: string) => Promise<RestyResponse<any>>;
}

// AudioAPI 音频接口
export interface AudioAPI {
  postAudio: (channelID: string, value: AudioControl) => Promise<RestyResponse<AudioControl>>;
}

// RoleAPI 用户组相关接口
export interface RoleAPI {
  roles: (guildID: string) => Promise<RestyResponse<GuildRoles>>;
  postRole: (guildID: string, role: IRole) => Promise<RestyResponse<string>>;
  patchRole: (guildID: string, roleID: string, role: IRole) => Promise<RestyResponse<string>>;
  deleteRole: (guildID: string, roleID: string) => Promise<RestyResponse<any>>;
}

// MemberAPI 成员相关接口，添加成员到用户组等
export interface MemberAPI {
  memberAddRole: (guildID: string, roleID: string, userID: string, channel?: IChannel) => Promise<RestyResponse<any>>;
  memberDeleteRole: (
    guildID: string,
    roleID: string,
    userID: string,
    channel?: IChannel,
  ) => Promise<RestyResponse<any>>;
}

export interface DirectMessageAPI {
  // CreateDirectMessage 创建私信频道
  CreateDirectMessage: (dm: DirectMessageToCreate) => Promise<RestyResponse<DirectMessage>>;
  // PostDirectMessage 在私信频道内发消息
  PostDirectMessage: (dm: IDirectMessage, msg: MessageToCreate) => Promise<RestyResponse<IMessage>>;
}

export interface ChannelPermissionsAPI {
  // ChannelPermissions 获取指定子频道的权限
  ChannelPermissions: (channelID: string, userID: string) => Promise<RestyResponse<IChannelPermissions>>;
  // PutChannelPermissions 修改指定子频道的权限
  PutChannelPermissions: (
    channelID: string,
    userID: string,
    p: UpdateChannelPermissions,
  ) => Promise<RestyResponse<any>>;
}
