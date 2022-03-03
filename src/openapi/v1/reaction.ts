import { Config, OpenAPIRequest, ReactionAPI, ReactionObj } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class Reaction implements ReactionAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 发表表情表态
  public postReaction(channelId: string, reactionToCreate: ReactionObj): Promise<RestyResponse<any>> {
    const options = {
      method: 'PUT' as const,
      url: getURL('reactionURI'),
      rest: {
        channelID: channelId,
        messageID: reactionToCreate?.message_id,
        emojiType: reactionToCreate?.emoji_type,
        emojiID: reactionToCreate?.emoji_id,
      },
    };
    return this.request(options);
  }

  // 删除表情表态
  public deleteReaction(channelId: string, reactionToDelete: ReactionObj): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('reactionURI'),
      rest: {
        channelID: channelId,
        messageID: reactionToDelete?.message_id,
        emojiType: reactionToDelete?.emoji_type,
        emojiID: reactionToDelete?.emoji_id,
      },
    };
    return this.request(options);
  }
}
