import {Config, OpenAPIRequest, MemberAddRoleBody, MemberAPI} from '@src/types';
import {RestyResponse} from 'resty-client';
import {getURL} from './resource';

export default class Member implements MemberAPI {
  public request: OpenAPIRequest;
  public config: Config;

  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 增加频道身份组成员
  public memberAddRole(
    guildID: string,
    roleID: string,
    userID: string,
    channel?: string | MemberAddRoleBody, // 兼容原来传递 channel 对象的逻辑，后续仅支持 string
  ): Promise<RestyResponse<any>> {
    const channelObj =
      typeof channel === 'string'
        ? {
          channel: {
            id: channel,
          },
        }
        : channel;

    const options = {
      method: 'PUT' as const,
      url: getURL(this.config.sandbox)('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID,
      },
      data: channelObj,
    };
    return this.request(options);
  }

  // 删除频道身份组成员
  public memberDeleteRole(
    guildID: string,
    roleID: string,
    userID: string,
    channel?: string | MemberAddRoleBody, // 兼容原来传递 channel 对象的逻辑，后续仅支持 string
  ): Promise<RestyResponse<any>> {
    const channelObj =
      typeof channel === 'string'
        ? {
          channel: {
            id: channel,
          },
        }
        : channel;

    const options = {
      method: 'DELETE' as const,
      url: getURL(this.config.sandbox)('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID,
      },
      data: channelObj,
    };
    return this.request(options);
  }
}
