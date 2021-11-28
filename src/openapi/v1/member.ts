import { Config, MemberAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

// 子频道类型 ChannelType
// 0.文字子频道 1.保留，不可用 2.语音子频道 3.保留，不可用 4.子频道分类 10005.直播子频道
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 10005;

// 子频道子类型 ChannelSubType
// 0.闲聊 1.公告 2.攻略 3.开黑
export type ChannelSubType = 0 | 1 | 2 | 3;
export interface IChannel extends ChannelValueObject {
  id: string; // 频道ID
  guild_id: string; // 群ID
}

export interface ChannelValueObject {
  name: string; // 频道名称
  type: ChannelType; // 频道类型
  position: number; // 排序位置
  parent_id: string; // 父频道的ID
  owner_id: string; // 拥有者ID
  sub_type: ChannelSubType; // 子频道子类型
}
export default class Member implements MemberAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  public memberAddRole(
    guildID: string,
    roleID: string,
    userID: string,
    channel?: IChannel,
  ): Promise<RestyResponse<any>> {
    const options = {
      method: 'PUT' as const,
      url: getURL('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID,
      },
      data: {
        channel,
      },
    };
    return this.request(options);
  }

  public memberDeleteRole(
    guildID: string,
    roleID: string,
    userID: string,
    channel?: IChannel,
  ): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID,
      },
      data: {
        channel,
      },
    };
    return this.request(options);
  }
}
