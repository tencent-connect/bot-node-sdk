import {
  OpenAPIRequest,
  Config,
  DirectMessageAPI,
  DirectMessageToCreate,
  IDirectMessage,
  IMessage,
  MessageToCreate,
} from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class DirectMessage implements DirectMessageAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 创建私信频道
  public createDirectMessage(dm: DirectMessageToCreate): Promise<RestyResponse<IDirectMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL('userMeDMURI'),
      data: dm,
    };
    return this.request<IDirectMessage>(options);
  }

  // 在私信频道内发消息
  public postDirectMessage(guildID: string, msg: MessageToCreate): Promise<RestyResponse<IMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL('dmsURI'),
      rest: {
        guildID,
      },
      data: msg,
    };
    return this.request<IMessage>(options);
  }
}
