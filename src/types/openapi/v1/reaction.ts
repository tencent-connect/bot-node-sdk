import { RestyResponse } from 'resty-client';

/**
 * =============  Reaction 接口  =============
 */
export interface ReactionAPI {
  postReaction: (channelID: string, reactionToCreate: ReactionObj) => Promise<RestyResponse<any>>;
  deleteReaction: (channelID: string, reactionToDelete: ReactionObj) => Promise<RestyResponse<any>>;
  getReactionUserList: (
    channelID: string,
    reactionToDelete: ReactionObj,
    options: ReactionUserListObj,
  ) => Promise<RestyResponse<any>>;
}

export interface ReactionObj {
  message_id: string;
  emoji_type: number;
  emoji_id: string;
}

// 拉取表情表态用户列表分页入参
export interface ReactionUserListObj {
  cookie: string; // 上次请求返回的cookie，第一次请求无需填写
  limit: number; // 每次拉取数量，默认20，最多50，只在第一次请求时设置
}
