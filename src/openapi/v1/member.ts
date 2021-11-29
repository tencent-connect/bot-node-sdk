import { Config, MemberAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IChannel } from './channel';
import { getURL } from './resource';

export interface MemberAddRoleBody extends IChannel {}
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
    channel?: MemberAddRoleBody,
  ): Promise<RestyResponse<any>> {
    const options = {
      method: 'PUT' as const,
      url: getURL('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID,
      },
      data: channel,
    };
    return this.request(options);
  }
  // 删除频道身份组成员
  public memberDeleteRole(
    guildID: string,
    roleID: string,
    userID: string,
    channel?: MemberAddRoleBody,
  ): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID,
      },
      data: channel,
    };
    return this.request(options);
  }
}
