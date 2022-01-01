import { MessagesPager, MessageToCreate } from '@src/types';
import { client, channelID, REQUEST_SUCCESS_CODE, newWsClient } from '../config';

describe('message测试', () => {
  test('【 messages方法 】=== 获取消息列表(pager默认)', async () => {
    const res = await client.messageApi.messages(channelID, {} as MessagesPager);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  test('【 messages方法 】=== 获取消息列表(pager指定)', async () => {
    const messageList = (await client.messageApi.messages(channelID, {} as MessagesPager)).data;
    const limit = '5';
    const res = await client.messageApi.messages(channelID, {
      type: 'after',
      id: messageList[0].id,
      limit,
    });
    expect(res?.data?.length).toBeLessThan(Number(limit));
  });

  test('【 messages方法 】=== 获取指定消息', async () => {
    const messageList = (await client.messageApi.messages(channelID, {} as MessagesPager)).data;
    const messageInfo = (await client.messageApi.message(channelID, messageList[0].id)).data;
    expect(messageInfo.message.id).toStrictEqual(messageList[0].id);
  });

  // TODO:需要补全多种类型的消息发送]
  test('【 postMessage方法 】=== 发送消息(content)', async () => {
    // 1.建立ws连接
    const wsClient = newWsClient();
    // 2.发送消息
    const textContent = 'test post message';
    const res = await client.messageApi.postMessage(channelID, {
      content: textContent,
    } as MessageToCreate);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.content).toStrictEqual(textContent);
    // 3.关闭连接
    wsClient.disconnect();
  });
});
