import { client, channelID, userID, REQUEST_SUCCESS_CODE } from '../config';

describe('channelPermissions测试', () => {
  test('【 channelPermissions方法 】=== 获取指定子频道的权限', async () => {
    const res = await client.channelPermissionsApi.channelPermissions(channelID, userID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.channel_id).toStrictEqual(channelID);
  });

  // 目前接口不通  不知道如何使用
  // test('【 putChannelPermissions方法 】=== 修改指定子频道的权限', async () => {
  //   const permissionsRes = await client.channelPermissionsApi.channelPermissions(channelID, userID);
  //   const oldPermissions = permissionsRes.data;
  //   // 修改一下
  //   const res = await client.channelPermissionsApi.putChannelPermissions(channelID, userID, {
  //     add: '1',
  //     remove:"2"
  //   });
  //   // 再修改回去
  //   console.log(JSON.stringify(oldPermissions.data));
  //   // const res = await client.channelPermissionsApi.putChannelPermissions(channelID,userID)
  //   // expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  // });
});
