import { RestyResponse } from 'resty-client';

/**
 * =============  Reaction 接口  =============
 */
export interface ReactionAPI {
  postReaction: (channelID: string, reactionToCreate: ReactionObj) => Promise<RestyResponse<any>>;
  deleteReaction: (channelID: string, reactionToDelete: ReactionObj) => Promise<RestyResponse<any>>;
}

export interface ReactionObj {
  message_id: string;
  emoji_type: number;
  emoji_id: string;
}
