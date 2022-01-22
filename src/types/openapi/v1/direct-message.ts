import { RestyResponse } from 'resty-client';
import { IMessage, MessageToCreate } from './message';

/**
 * =============  DirectMessage 私信接口  =============
 */
export interface DirectMessageAPI {
  // CreateDirectMessage 创建私信频道
  createDirectMessage: (dm: DirectMessageToCreate) => Promise<RestyResponse<IDirectMessage>>;
  // PostDirectMessage 在私信频道内发消息
  postDirectMessage: (guildID: string, msg: MessageToCreate) => Promise<RestyResponse<IMessage>>;
}

// DirectMessageToCreate 创建私信频道的结构体定义
export interface DirectMessageToCreate {
  source_guild_id: string; // 频道ID
  recipient_id: string; // 用户ID
}

// 子频道权限对象(ChannelPermissions)
export interface IDirectMessage {
  guild_id: string; // 频道ID
  channel_id: string; // 子频道id
  create_time: string; // 私信频道创建的时间戳
}
