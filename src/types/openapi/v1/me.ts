import { RestyResponse } from 'resty-client';
import { IGuild } from './guild';

/**
 * =============  User 用户接口  =============
 */
export interface MeAPI {
  me: () => Promise<RestyResponse<IUser>>;
  meGuilds: () => Promise<RestyResponse<IGuild[]>>;
}
export interface IUser {
  id: string;
  username: string;
  avatar: string;
  bot: boolean;
  union_openid: string; // 特殊关联应用的 openid
  union_user_account: string; // 机器人关联的用户信息，与union_openid关联的应用是同一个
}
