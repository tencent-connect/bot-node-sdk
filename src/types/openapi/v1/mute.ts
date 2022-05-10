import { RestyResponse } from 'resty-client';

/**
 * =============  Mute 禁言接口  =============
 */
export interface MuteAPI {
  muteMember: (guildID: string, userID: string, options: MuteOptions) => Promise<RestyResponse<any>>;
  muteAll: (guildID: string, options: MuteOptions) => Promise<RestyResponse<any>>;
  muteMembers: (guildID: string, userIDList: Array<string>, options: MuteOptions) => Promise<RestyResponse<any>>;
}

export interface MuteOptions {
  timeTo?: string; // 禁言到期时间戳，绝对时间戳，单位：秒
  seconds?: string; // 禁言多少秒（两个字段二选一，默认以 timeTo 为准）
}
