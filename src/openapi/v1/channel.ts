import { ChannelAPI, Config, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

// 子频道类型 ChannelType
// 0.文字子频道 1.保留，不可用 2.语音子频道 3.保留，不可用 4.子频道分类 10005.直播子频道
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 10005;

// 子频道子类型 ChannelSubType
// 0.闲聊 1.公告 2.攻略 3.开黑
export type ChannelSubType = 0 | 1 | 2 | 3;

// 子频道对象(Channel)
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
export default class Channel implements ChannelAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 获取子频道信息
  public channel(channelID: string): Promise<RestyResponse<IChannel>> {
    const options = {
      method: 'GET' as const,
      url: getURL('channelURI'),
      rest: {
        channelID,
      },
    };
    return this.request<IChannel>(options);
  }

  // 获取频道下的子频道列表
  public channels(guildID: string): Promise<RestyResponse<IChannel[]>> {
    const options = {
      method: 'GET' as const,
      url: getURL('channelsURI'),
      rest: {
        guildID,
      },
    };
    return this.request<IChannel[]>(options);
  }
  // 创建子频道
  public postChannel(guildID: string, channel: ChannelValueObject): Promise<RestyResponse<IChannel>> {
    if (channel.position === 0) {
      channel.position = Number(new Date());
    }
    const options = {
      method: 'POST' as const,
      url: getURL('channelsURI'),
      rest: {
        guildID,
      },
      data: channel,
    };
    return this.request<IChannel>(options);
  }
  // 修改子频道信息
  public patchChannel(guildID: string, channel: ChannelValueObject): Promise<RestyResponse<IChannel>> {
    if (channel.position === 0) {
      channel.position = Number(new Date());
    }
    const options = {
      method: 'PATCH' as const,
      url: getURL('channelURI'),
      rest: {
        guildID,
      },
      data: channel,
    };
    return this.request<IChannel>(options);
  }
  // 删除指定子频道
  public deleteChannel(channelID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('channelURI'),
      rest: {
        channelID,
      },
    };
    return this.request(options);
  }
}
