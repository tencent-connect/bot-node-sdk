import { Config, OpenAPIRequest, ChannelAPI, PostChannelObj, IChannel, PatchChannelObj } from '@src/types';
import { getTimeStampNumber } from '@src/utils/utils';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

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
      url: getURL(this.config.sandbox)('channelURI'),
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
      url: getURL(this.config.sandbox)('channelsURI'),
      rest: {
        guildID,
      },
    };
    return this.request<IChannel[]>(options);
  }

  // 创建子频道
  public postChannel(guildID: string, channel: PostChannelObj): Promise<RestyResponse<IChannel>> {
    if (channel.position === 0) {
      channel.position = getTimeStampNumber();
    }
    const options = {
      method: 'POST' as const,
      url: getURL(this.config.sandbox)('channelsURI'),
      rest: {
        guildID,
      },
      data: channel,
    };
    return this.request<IChannel>(options);
  }

  // 修改子频道信息
  public patchChannel(channelID: string, channel: PatchChannelObj): Promise<RestyResponse<IChannel>> {
    if (channel.position === 0) {
      channel.position = getTimeStampNumber();
    }
    const options = {
      method: 'PATCH' as const,
      url: getURL(this.config.sandbox)('channelURI'),
      rest: {
        channelID,
      },
      data: channel,
    };
    return this.request<IChannel>(options);
  }
  // 删除指定子频道
  public deleteChannel(channelID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL(this.config.sandbox)('channelURI'),
      rest: {
        channelID,
      },
    };
    return this.request(options);
  }
}
