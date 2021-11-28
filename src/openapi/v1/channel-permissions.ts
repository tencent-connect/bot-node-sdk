import { ChannelPermissionsAPI, OpenAPIRequest, Config } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export interface IChannelPermissions {
  channel_id: string;
  user_id: string;
  permissions: string;
}

export interface UpdateChannelPermissions {
  add: string;
  remove: string;
}
export default class ChannelPermissions implements ChannelPermissionsAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  public ChannelPermissions(channelID: string, userID: string): Promise<RestyResponse<IChannelPermissions>> {
    const options = {
      method: 'GET' as const,
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID,
      },
    };
    return this.request<IChannelPermissions>(options);
  }

  public PutChannelPermissions(
    channelID: string,
    userID: string,
    p: UpdateChannelPermissions,
  ): Promise<RestyResponse<any>> {
    if (p.add !== '') {
      // TODO
    }
    if (p.remove !== '') {
      // TODO
    }
    const options = {
      method: 'PUT' as const,
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID,
      },
      data: {
        p,
      },
    };
    return this.request<IChannelPermissions>(options);
  }
}
