/* eslint-disable prefer-promise-reject-errors */
import {register} from '@src/openapi/openapi';
import resty, {RequestOptions, RestyResponse} from 'resty-client';
import Guild from './guild';
import Channel from './channel';
import Me from './me';
import Message from './message';
import Member from './member';
import Role from './role';
import DirectMessage from './direct-message';
import ChannelPermissions from './channel-permissions';
import Audio from './audio';
import Mute from './mute';
import Announce from './announce';
import Schedule from './schedule';
import {addUserAgent} from '@src/utils/utils';
import {
  AnnounceAPI,
  AudioAPI,
  ChannelAPI,
  ChannelPermissionsAPI,
  Config,
  DirectMessageAPI,
  GuildAPI,
  IOpenAPI,
  MeAPI,
  MemberAPI,
  MessageAPI,
  MuteAPI,
  RoleAPI,
  ScheduleAPI,
} from '@src/types';

export const apiVersion = 'v1';

export class OpenAPI implements IOpenAPI {
  static newClient(config: Config) {
    return new OpenAPI(config);
  }

  config: Config = {
    sandbox: false,
    appID: '',
    token: ''
  };
  public guildApi!: GuildAPI;
  public channelApi!: ChannelAPI;
  public meApi!: MeAPI;
  public messageApi!: MessageAPI;
  public memberApi!: MemberAPI;
  public roleApi!: RoleAPI;
  public muteApi!: MuteAPI;
  public announceApi!: AnnounceAPI;
  public scheduleApi!: ScheduleAPI;
  public directMessageApi!: DirectMessageAPI;
  public channelPermissionsApi!: ChannelPermissionsAPI;
  public audioApi!: AudioAPI;
  constructor(config: Config) {
    this.config = config;
    this.register(this);
  }
  public register(client: IOpenAPI) {
    // 注册聚合client
    client.guildApi = new Guild(this.request, this.config);
    client.channelApi = new Channel(this.request, this.config);
    client.meApi = new Me(this.request, this.config);
    client.messageApi = new Message(this.request, this.config);
    client.memberApi = new Member(this.request, this.config);
    client.roleApi = new Role(this.request, this.config);
    client.muteApi = new Mute(this.request, this.config);
    client.announceApi = new Announce(this.request, this.config);
    client.scheduleApi = new Schedule(this.request, this.config);
    client.directMessageApi = new DirectMessage(this.request, this.config);
    client.channelPermissionsApi = new ChannelPermissions(this.request, this.config);
    client.audioApi = new Audio(this.request, this.config);
  }
  // 基础rest请求
  public request<T extends Record<any, any> = any>(options: RequestOptions): Promise<RestyResponse<T>> {
    const { appID, token } = this.config;
    options.headers = {
      ...options.headers,
      Authorization: `Bot ${appID}.${token}`,
    };
    // 添加 UA
    addUserAgent(options.headers);

    // 简化错误信息，后续可考虑通过中间件形式暴露给用户自行处理
    resty.useRes(
      (result) => result,
      (error) => {
        let traceid = error?.response?.headers?.['x-tps-trace-id'];
        if (error?.response?.data) {
          return Promise.reject({
            ...error.response.data,
            traceid,
          });
        }
        if (error?.response) {
          return Promise.reject({
            ...error.response,
            traceid,
          });
        }
        return Promise.reject(error);
      },
    );

    const client = resty.create(options);
    return client.request<T>(options.url!, options);
  }
}

export function v1Setup() {
  register(apiVersion, OpenAPI);
}
