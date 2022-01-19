import {RequestOptions, RestyResponse} from 'resty-client';
import {AudioAPI} from './v1/audio';
import {ChannelAPI} from './v1/channel';
import {ChannelPermissionsAPI} from './v1/channel-permission';
import {DirectMessageAPI} from './v1/direct-message';
import {GuildAPI} from './v1/guild';
import {MeAPI} from './v1/me';
import {MemberAPI} from './v1/member';
import {MessageAPI} from './v1/message';
import {RoleAPI} from './v1/role';
import {MuteAPI} from './v1/mute';
import {AnnounceAPI} from './v1/announce';
import {ScheduleAPI} from './v1/schedule';

export type OpenAPIRequest = <T extends Record<any, any> = any>(options: RequestOptions) => Promise<RestyResponse<T>>;

export interface Config {
  appID: string;
  token: string;
  sandbox: boolean
}

export interface IOpenAPI {
  config: Config;
  request: OpenAPIRequest;
  guildApi: GuildAPI;
  channelApi: ChannelAPI;
  meApi: MeAPI;
  messageApi: MessageAPI;
  memberApi: MemberAPI;
  roleApi: RoleAPI;
  muteApi: MuteAPI;
  announceApi: AnnounceAPI;
  scheduleApi: ScheduleAPI;
  directMessageApi: DirectMessageAPI;
  channelPermissionsApi: ChannelPermissionsAPI;
  audioApi: AudioAPI;
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

export * from './v1/audio';
export * from './v1/channel';
export * from './v1/channel-permission';
export * from './v1/direct-message';
export * from './v1/guild';
export * from './v1/me';
export * from './v1/member';
export * from './v1/message';
export * from './v1/role';
export * from './v1/mute';
export * from './v1/announce';
export * from './v1/schedule';
