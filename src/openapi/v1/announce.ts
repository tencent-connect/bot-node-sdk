import {Config, OpenAPIRequest, AnnounceAPI, IAnnounce} from '@src/types';
import {RestyResponse} from 'resty-client';
import {apiMap, getURL} from "@src/openapi/v1/resource"

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
      url: this.getURL('guildAnnouncesURI'),
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
      url: this.getURL('guildAnnounceURI'),
      rest: {
        guildID,
        messageID,
      },
    };
    return this.request(options);
  }

  // 创建channel公告
  public postChannelAnnounce(channelID: string, messageID: string): Promise<RestyResponse<IAnnounce>> {
    const options = {
      method: 'POST' as const,
      url: this.getURL('channelAnnouncesURI'),
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
      url: this.getURL('channelAnnounceURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request(options);
  }
  private getURL(url: keyof typeof apiMap) {
    return getURL(this.config.sandbox)(url)
  }
}
