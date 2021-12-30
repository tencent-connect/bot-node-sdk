import { userID, REQUEST_SUCCESS_CODE_WITH_NO_CONTENT } from './../config';
import { client, guildID, channelID, ROLE_GOOLDEN_ADMIN_ID } from '../config';

describe('member测试', () => {
  test('【 memberAddRole方法 】=== 增加、移除频道身份组成员', async () => {
    // 1.给用户金牌管理员权限
    const channelInfo = (await client.channelApi.channel(channelID)).data;
    const addRoleRes = await client.memberApi.memberAddRole(guildID, ROLE_GOOLDEN_ADMIN_ID, userID, channelInfo?.id);
    expect(addRoleRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    // 2.验证是否给予权限成功
    const userInfo = (await client.guildApi.guildMember(guildID, userID)).data;
    expect(userInfo?.roles).toContain(ROLE_GOOLDEN_ADMIN_ID);

    // 3.删除金牌管理员权限
    const removeRoleRes = await client.memberApi.memberDeleteRole(
      guildID,
      ROLE_GOOLDEN_ADMIN_ID,
      userID,
      channelInfo?.id,
    );
    expect(removeRoleRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    // 4.验证是否删除成功
    const newUserInfo = (await client.guildApi.guildMember(guildID, userID)).data;
    expect(newUserInfo?.roles).not.toContain(ROLE_GOOLDEN_ADMIN_ID);
  });
});
