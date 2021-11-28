import { DirectMessageAPI, OpenAPIRequest, Config } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IMessage, MessageToCreate } from './message';
import { getURL } from './resource';

// DirectMessageToCreate 创建私信频道的结构体定义
export interface DirectMessageToCreate {
  source_guild_id: string; // 频道ID
  recipient_id: string; // 用户ID
}

export interface IDirectMessage {
  guild_id: string; // 频道ID
  channel_id: string; // 子频道id
  create_time: string; // 私信频道创建的时间戳
}
export default class DirectMessage implements DirectMessageAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  public CreateDirectMessage(dm: DirectMessageToCreate): Promise<RestyResponse<DirectMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL('userMeDMURI'),
      data: {
        dm,
      },
    };
    return this.request<DirectMessage>(options);
  }

  public PostDirectMessage(dm: IDirectMessage, msg: MessageToCreate): Promise<RestyResponse<IMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL('dmsURI'),
      rest: {
        guildID: dm.guild_id,
      },
      data: {
        msg,
      },
    };
    return this.request<IMessage>(options);
  }
}
