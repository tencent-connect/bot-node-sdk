import { Config, MeAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IGuild } from './guild';
import { getURL } from './resource';

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  bot: boolean;
  union_openid: string; // 特殊关联应用的 openid
  union_user_account: string; // 机器人关联的用户信息，与union_openid关联的应用是同一个
}
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
