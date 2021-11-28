import { Config, MeAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IGuild } from './guild';
import { IUser } from './message';
import { getURL } from './resource';

export default class Me implements MeAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  public me(): Promise<RestyResponse<IUser>> {
    const options = {
      method: 'GET' as const,
      url: getURL('userMeURI'),
    };
    return this.request<IUser>(options);
  }
  public meGuilds(): Promise<RestyResponse<IGuild[]>> {
    const options = {
      method: 'GET' as const,
      url: getURL('userMeGuildsURI'),
    };
    return this.request<IGuild[]>(options);
  }
}
