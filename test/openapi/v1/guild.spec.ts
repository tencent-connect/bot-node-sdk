import {
  client,
  guildID,
  channelID,
  userID,
  REQUEST_SUCCESS_CODE,
  REQUEST_SUCCESS_CODE_WITH_NO_CONTENT } from '../config';

describe('guild测试', () => {
  test('【 guild方法 】=== 获取频道信息', async () => {
    const res = await client.guildApi.guild(guildID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.id).toStrictEqual(guildID);
  });

  test('【 guildMember方法 】=== 获取某个成员的信息', async () => {
    const res = await client.guildApi.guildMember(guildID, userID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.user?.id).toStrictEqual(userID);
  });

  test('【 guildMembers 】=== 获取频道成员列表（使用默认分页参数）', async () => {
    const res = await client.guildApi.guildMembers(guildID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(Array.isArray(res?.data)).toStrictEqual(true);
  });

  test('【 guildMembers 】=== 获取频道成员列表（传入分页参数）', async () => {
    const limit = 2;
    const res = await client.guildApi.guildMembers(guildID, { after: '0', limit });
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.length).toBeLessThanOrEqual(limit);
  });

  test('【 deleteGuildMember 】=== 删除指定频道成员', async () => {
    const testUserId = '5283226123397135603';
    const res = await client.guildApi.deleteGuildMember(guildID, testUserId);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);
  });

  test('【 guildVoiceMembers 】=== 语音子频道内参与语音的频道成员列表', async () => {
    const res = await client.guildApi.guildVoiceMembers(channelID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(Array.isArray(res?.data)).toStrictEqual(true);
  });
});
