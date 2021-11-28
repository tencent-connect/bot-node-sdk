import { Config, GuildAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IUser } from './message';
import { getURL } from './resource';

export interface IGuild {
  id: string; // 频道ID（与客户端上看到的频道ID不同）
  name: string; // 频道名称
  icon: string; // 频道头像
  owner_id: string; // 拥有者ID
  owner: boolean; // 是否为拥有者
  member_count: number; // 成员数量
  max_members: number; // 最大成员数目
  description: string; // 频道描述
  joined_at: number; // 当前用户加入群的时间
  channels: any[]; // 频道列表
  unionworld_id: string; // 游戏绑定公会区服ID
  union_org_id: string; // 游戏绑定公会/战队ID
}

// Member 群成员
export interface IMember {
  guild_id: string;
  joined_at: string;
  nick: string;
  user: IUser;
  roles: string[];
  deaf: boolean;
  mute: boolean;
}

export default class Guild implements GuildAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // Guild 对象
  public async guild(guildID: string): Promise<RestyResponse<IGuild>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildURI'),
      rest: {
        guildID,
      },
    };
    return this.request<IGuild>(options);
  }
  public guildMember(guildID: string, userID: string): Promise<RestyResponse<IMember>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildMemberURI'),
      rest: {
        guildID,
        userID,
      },
    };
    return this.request<IMember>(options);
  }
  public guildMembers(guildID: string): Promise<RestyResponse<IMember[]>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildMembersURI'),
      rest: {
        guildID,
      },
    };
    return this.request<IMember[]>(options);
  }
  public deleteGuildMember(guildID: string, userID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('guildMemberURI'),
      rest: {
        guildID,
        userID,
      },
    };
    return this.request<any>(options);
  }
}
