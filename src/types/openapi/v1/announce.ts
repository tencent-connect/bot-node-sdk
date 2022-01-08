import { RestyResponse } from 'resty-client';

/**
 * =============  Announce 公告接口  =============
 */
export interface AnnounceAPI {
  postGuildAnnounce: (guildID: string, channelID: string, messageID: string) => Promise<RestyResponse<IAnnounce>>;
  deleteGuildAnnounce: (guildID: string, messageID: string) => Promise<RestyResponse<any>>;
  postChannelAnnounce: (channelID: string, messageID: string) => Promise<RestyResponse<IAnnounce>>;
  deleteChannelAnnounce: (channelID: string, messageID: string) => Promise<RestyResponse<any>>;
}

// 公告对象(Announce)
export interface IAnnounce {
  guild_id: string; // 频道ID
  channel_id: string; // 子频道ID
  message_id: string; // 消息ID
}
