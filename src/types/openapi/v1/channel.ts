import { RestyResponse } from 'resty-client';

/**
 * =============  Channel 子频道接口  =============
 */
export interface ChannelAPI {
  channel: (channelID: string) => Promise<RestyResponse<IChannel>>;
  channels: (guildID: string) => Promise<RestyResponse<IChannel[]>>;
  postChannel: (guildID: string, channel: ChannelValueObject) => Promise<RestyResponse<IChannel>>;
  patchChannel: (channelID: string, channel: ChannelValueObject) => Promise<RestyResponse<IChannel>>;
  deleteChannel: (channelID: string) => Promise<RestyResponse<any>>;
}

// 子频道类型 ChannelType
// 0.文字子频道 1.保留，不可用 2.语音子频道 3.保留，不可用 4.子频道分类 10005.直播子频道
export type ChannelType = 0 | 1 | 2 | 3 | 4 | 10005;

// 子频道子类型 ChannelSubType
// 0.闲聊 1.公告 2.攻略 3.开黑
export type ChannelSubType = 0 | 1 | 2 | 3;

// 子频道对象(Channel)
export interface IChannel extends ChannelValueObject {
  id: string; // 频道ID
  guild_id: string; // 群ID
}

export interface ChannelValueObject {
  name: string; // 频道名称
  type: ChannelType; // 频道类型
  position: number; // 排序位置
  parent_id: string; // 父频道的ID
  owner_id: string; // 拥有者ID
  sub_type: ChannelSubType; // 子频道子类型
}
