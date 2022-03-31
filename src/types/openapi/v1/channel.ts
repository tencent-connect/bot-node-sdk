import { RestyResponse } from 'resty-client';

/**
 * =============  Channel 子频道接口  =============
 */
export interface ChannelAPI {
  channel: (channelID: string) => Promise<RestyResponse<IChannel>>;
  channels: (guildID: string) => Promise<RestyResponse<IChannel[]>>;
  postChannel: (guildID: string, channel: PostChannelObj) => Promise<RestyResponse<IChannel>>;
  patchChannel: (channelID: string, channel: PatchChannelObj) => Promise<RestyResponse<IChannel>>;
  deleteChannel: (channelID: string) => Promise<RestyResponse<any>>;
}

// 子频道类型 ChannelType
// 0.文字子频道 1.保留，不可用 2.语音子频道 3.保留，不可用 4.子频道分类 10005.直播子频道
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 10005;

// 子频道子类型 ChannelSubType
// 0.闲聊 1.公告 2.攻略 3.开黑
export type ChannelSubType = 0 | 1 | 2 | 3;

// 子频道对象(Channel)
export interface IChannel extends PostChannelObj {
  id: string; // 频道 ID
  guild_id: string; // 群 ID
  owner_id: string; // 拥有者 ID
  speak_permission?: number; // 子频道发言权限
  application_id?: string; // 用于标识应用子频道应用类型
}

export interface PostChannelObj {
  name: string; // 频道名称
  type: ChannelType; // 频道类型
  sub_type?: ChannelSubType; // 子频道子类型
  position: number; // 排序位置
  parent_id: string; // 父频道的ID
  private_type?: number; // 子频道私密类型
  private_user_ids?: string[]; // 子频道私密类型成员 ID
  permissions?: string; // 用户拥有的子频道权限
}

export type PatchChannelObj = Partial<Omit<PostChannelObj, 'sub_type' | 'private_user_ids'>>;
