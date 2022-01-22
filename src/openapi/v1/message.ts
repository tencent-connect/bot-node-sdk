import {Config, OpenAPIRequest, IMessage, IMessageRes, MessageAPI, MessagesPager, MessageToCreate} from '@src/types';
import {RestyResponse} from 'resty-client';
import {getURL} from './resource';

export default class Message implements MessageAPI {
  public request: OpenAPIRequest;
  public config: Config;

  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 获取指定消息
  public message(channelID: string, messageID: string): Promise<RestyResponse<IMessageRes>> {
    const options = {
      method: 'GET' as const,
      url: getURL(this.config.sandbox)('messageURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request<IMessageRes>(options);
  }

  // 获取消息列表
  public messages(channelID: string, pager?: MessagesPager): Promise<RestyResponse<IMessage[]>> {
    const params = Object.create(null);
    if (pager && pager.type && pager.id) {
      params[pager.type] = pager.id;
      params.limit = pager.limit || 20;
    }

    const options = {
      method: 'GET' as const,
      url: getURL(this.config.sandbox)('messagesURI'),
      rest: {
        channelID,
      },
      params,
    };
    return this.request<IMessage[]>(options);
  }

  // 发送消息
  public postMessage(channelID: string, message: MessageToCreate): Promise<RestyResponse<IMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL(this.config.sandbox)('messagesURI'),
      rest: {
        channelID,
      },
      data: message,
    };
    return this.request<IMessage>(options);
  }

  // 撤回消息
  public deleteMessage(channelID: string, messageID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL(this.config.sandbox)('messageURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request(options);
  }
}
