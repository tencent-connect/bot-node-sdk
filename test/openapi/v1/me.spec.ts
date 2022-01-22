import { client, REQUEST_SUCCESS_CODE } from '../config';

describe('me测试', () => {
  test('【 me方法 】=== 获取当前用户信息', async () => {
    const res = await client.meApi.me();
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.id).not.toBeUndefined();
  });

  test('【 meGuilds方法 】=== 获取当前用户频道列表', async () => {
    const res = await client.meApi.meGuilds();
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });
});
