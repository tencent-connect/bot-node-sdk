import { Config, OpenAPIRequest, IUser, MeAPI, IGuild } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class Me implements MeAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 获取当前用户信息
  public me(): Promise<RestyResponse<IUser>> {
    const options = {
      method: 'GET' as const,
      url: getURL('userMeURI'),
    };
    return this.request<IUser>(options);
  }
  // 获取当前用户频道列表
  public meGuilds(): Promise<RestyResponse<IGuild[]>> {
    const options = {
      method: 'GET' as const,
      url: getURL('userMeGuildsURI'),
    };
    return this.request<IGuild[]>(options);
  }
}
