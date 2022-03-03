import { RestyResponse } from 'resty-client';

/**
 * =============  Announce 公告接口  =============
 */
export interface AnnounceAPI {
  postGuildAnnounce: (guildID: string, channelID: string, messageID: string) => Promise<RestyResponse<IAnnounce>>;
  deleteGuildAnnounce: (guildID: string, messageID: string) => Promise<RestyResponse<any>>;
  postGuildRecommend: (guildID: string, recommendObj: RecommendObj) => Promise<RestyResponse<IAnnounce>>;
  postChannelAnnounce: (channelID: string, messageID: string) => Promise<RestyResponse<IAnnounce>>;
  deleteChannelAnnounce: (channelID: string, messageID: string) => Promise<RestyResponse<any>>;
}

// 公告对象(Announce)
export interface IAnnounce {
  guild_id: string; // 频道ID
  channel_id: string; // 子频道ID
  message_id: string; // 消息ID
  announce_type?: number; // 推荐类别 0:成员公告; 1:欢迎公告
  recommend_channels?: RecommendChannel[]; // 推荐子频道列表
}

export interface RecommendObj {
  announces_type?: number; // 公告类别 0:成员公告，1:欢迎公告，默认为成员公告
  recommend_channels: RecommendChannel[]; // 推荐子频道列表
}

export interface RecommendChannel {
  channel_id: string;
  introduce: string; // 推荐语
}
