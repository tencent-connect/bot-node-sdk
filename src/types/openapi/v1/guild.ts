import { RestyResponse } from 'resty-client';
import { IChannel } from './channel';
import { IUser } from './me';

/**
 * =============  Guild 频道接口  =============
 */
export interface GuildAPI {
  guild: (guildID: string) => Promise<RestyResponse<IGuild>>;
  guildMember: (guildID: string, userID: string) => Promise<RestyResponse<IMember>>;
  guildMembers: (guildID: string, pager?: GuildMembersPager) => Promise<RestyResponse<IMember[]>>;
  deleteGuildMember: (guildID: string, userID: string) => Promise<RestyResponse<any>>;
  guildVoiceMembers: (channelID: string) => Promise<RestyResponse<IVoiceMember[]>>;
}

// 频道对象(Guild)
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
  channels: IChannel[]; // 频道列表
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

// 语音子频道参与语音的Member群成员
export interface IVoiceMember {
  user: IUser;
  nick: string;
  joined_at: string;
  mute: boolean;
}

export interface GuildMembersPager {
  // 上一次回包中最大的用户ID， 如果是第一次请求填0，默认为0
  after: string;
  limit: number;
}
