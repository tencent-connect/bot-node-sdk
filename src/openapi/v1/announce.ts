import { Config, OpenAPIRequest, AnnounceAPI, IAnnounce, RecommendObj } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class Announce implements AnnounceAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 创建guild公告
  public postGuildAnnounce(guildID: string, channelID: string, messageID: string): Promise<RestyResponse<IAnnounce>> {
    const options = {
      method: 'POST' as const,
      url: getURL('guildAnnouncesURI'),
      rest: {
        guildID,
      },
      data: {
        channel_id: channelID,
        message_id: messageID,
      },
    };
    return this.request<IAnnounce>(options);
  }

  // 删除guild公告
  public deleteGuildAnnounce(guildID: string, messageID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('guildAnnounceURI'),
      rest: {
        guildID,
        messageID,
      },
    };
    return this.request(options);
  }

  // 创建频道公告推荐子频道
  public postGuildRecommend(guildID: string, recommendObj: RecommendObj): Promise<RestyResponse<IAnnounce>> {
    const options = {
      method: 'POST' as const,
      url: getURL('guildAnnouncesURI'),
      rest: {
        guildID,
      },
      data: recommendObj,
    };
    return this.request<IAnnounce>(options);
  }

  // 创建channel公告
  public postChannelAnnounce(channelID: string, messageID: string): Promise<RestyResponse<IAnnounce>> {
    const options = {
      method: 'POST' as const,
      url: getURL('channelAnnouncesURI'),
      rest: {
        channelID,
      },
      data: {
        message_id: messageID,
      },
    };
    return this.request<IAnnounce>(options);
  }

  // 删除channel公告
  public deleteChannelAnnounce(channelID: string, messageID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('channelAnnounceURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request(options);
  }
}
