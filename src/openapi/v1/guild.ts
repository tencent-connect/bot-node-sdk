import { Config, GuildAPI } from '@src/types/openapi';
import { getURL } from './resource';

export interface GuildRes {
  id: string; // 频道ID（与客户端上看到的频道ID不同）
  name: string; // 频道名称
  icon: string; // 频道头像
  ownerID: string; // 拥有者ID
  owner: boolean; // 是否为拥有者
  memberCount: number; // 成员数量
  maxMembers: number; // 最大成员数目
  description: string; // 频道描述
  joinedAt: number; // 当前用户加入群的时间
  channels: any[]; // 频道列表
  unionWorldID: string; // 游戏绑定公会区服ID
  unionOrgID: string; // 游戏绑定公会/战队ID
}

// TODO 抛出错误
export default class Guild implements GuildAPI {
  request: any;
  config: Config;
  constructor(request: any, config: Config) {
    this.request = request;
    this.config = config;
  }
  // Guild 对象
  public async guild(guildID: string): Promise<GuildRes> {
    // TODO 进行参数校验
    const options = {
      method: 'GET',
      url: getURL('guildURI'),
      rest: {
        guildID,
      },
    };
    // TODO 泛型处理
    const res = await this.request(options);
    return res;
  }
  public guildMember() {}
  public guildMembers() {}
  public deleteGuildMember() {}
}
