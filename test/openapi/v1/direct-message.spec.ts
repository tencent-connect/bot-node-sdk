import { MessageToCreate } from '@src/types';
import { client, userID, guildID, REQUEST_SUCCESS_CODE } from '../config';

describe('directMessage测试', () => {
  test('【 createDirectMessage、postDirectMessage方法 】=== 创建私信频道、发送私信', async () => {
    // 1.创建私信频道
    const postSessionRes = await client.directMessageApi.createDirectMessage({
      recipient_id: userID, // 用户ID
      source_guild_id: guildID, // 频道ID
    });
    expect(postSessionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);

    //  2.发送消息
    const postMessage = 'test direct message';
    const postMessageRes = await client.directMessageApi.postDirectMessage(postSessionRes.data, {
      content: postMessage,
    } as MessageToCreate);
    expect(postMessageRes?.data?.guild_id).toStrictEqual(postSessionRes?.data?.guild_id);
    expect(postMessageRes?.data?.channel_id).toStrictEqual(postSessionRes?.data?.channel_id);
  });
});
