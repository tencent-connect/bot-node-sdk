import { client, channelID, REQUEST_SUCCESS_CODE_WITH_NO_CONTENT } from '../config';

describe('reaction测试', () => {
  const messageID = '1'
  const emojiType = 1;
  const emojiID = '1';
  const cookie = '';
  const limit = 20;

  test('【 postReaction方法 】=== 发表表情表态', async () => {
    // 发表表情表态
    const params = {
      message_id: messageID,
      emoji_type: emojiType,
      emoji_id: emojiID
    }
    const reactionRes = (await client.reactionApi.postReaction(channelID, params)).data;
    expect(reactionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);
  });

  test('【 deleteReaction方法 】=== 删除表情表态', async () => {
    // 删除表情表态
    const params = {
      message_id: messageID,
      emoji_type: emojiType,
      emoji_id: emojiID
    }
    const reactionRes = (await client.reactionApi.deleteReaction(channelID, params)).data;
    expect(reactionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);
  });

  test('【 getReactionUserList方法 】=== 拉取表情表态用户列表', async () => {
    // 拉取表情表态用户列表
    const params = {
      message_id: messageID,
      emoji_type: emojiType,
      emoji_id: emojiID
    }
    const options = {
      cookie,
      limit
    }
    const reactionRes = (await client.reactionApi.getReactionUserList(channelID, params, options)).data;
    expect(reactionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);
  });
});
