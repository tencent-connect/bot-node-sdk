import { Config, IPinsMessage, OpenAPIRequest, PinsMessageAPI } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class PinsMessage implements PinsMessageAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 获取精华消息
  public pinsMessage(channelID: string): Promise<RestyResponse<IPinsMessage>> {
    const options = {
      method: 'GET' as const,
      url: getURL('pinsMessageURI'),
      rest: {
        channelID,
      },
    };
    return this.request<IPinsMessage>(options);
  }

  // 发送精华消息
  public putPinsMessage(channelID: string, messageID: string): Promise<RestyResponse<IPinsMessage>> {
    const options = {
      method: 'PUT' as const,
      url: getURL('pinsMessageIdURI'),
      headers: {
        'Content-Type': 'application/json;',
      },
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request<IPinsMessage>(options);
  }

  // 删除精华消息
  public deletePinsMessage(channelID: string, messageID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('pinsMessageIdURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request(options);
  }
}
