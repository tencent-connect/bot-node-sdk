import { ChannelAPI, Config, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { ChannelValueObject, IChannel } from './member';
import { getURL } from './resource';

export default class Channel implements ChannelAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
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
      data: {
        channel,
      },
    };
    return this.request<IChannel>(options);
  }

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
      data: {
        channel,
      },
    };
    return this.request<IChannel>(options);
  }

  public deleteChannel(channelID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('channelURI'),
      rest: {
        channelID,
      },
    };
    return this.request<IChannel>(options);
  }
}
