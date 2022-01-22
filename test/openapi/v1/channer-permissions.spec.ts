import { UpdateChannelPermissions } from '@src/openapi/v1/channel-permissions';
import {
  client,
  secretChannelID,
  REQUEST_SUCCESS_CODE,
  secretChannelUserID,
  REQUEST_SUCCESS_CODE_WITH_NO_CONTENT,
} from '../config';

const WITH_PERMISSION = '1';
const WITHOUT_PERMISSION = '0';

describe('channelPermissions测试', () => {
  test('【 channelPermissions方法 】=== 获取指定子频道的权限', async () => {
    const res = await client.channelPermissionsApi.channelPermissions(secretChannelID, secretChannelUserID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.channel_id).toStrictEqual(secretChannelID);
  });

  // 必须是私密子频道（非所有人可访问）
  test('【 putChannelPermissions方法 】=== 修改指定子频道的权限（add,remove不同时为1）', async () => {
    // 1. 获取原有权限（测试账号原有权限为1 即可以看到私密频道）
    const originPermissionRes = await client.channelPermissionsApi.channelPermissions(
      secretChannelID,
      secretChannelUserID,
    );
    expect(originPermissionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(originPermissionRes?.data?.permissions).toStrictEqual(WITH_PERMISSION);

    // 2. 移除权限
    const removePermissionRes = await client.channelPermissionsApi.putChannelPermissions(
      secretChannelID,
      secretChannelUserID,
      {
        remove: '1',
        add: '0',
      },
    );
    expect(removePermissionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    // 3. 验证修改是否成功
    const permissionAfterRemoveRes = await client.channelPermissionsApi.channelPermissions(
      secretChannelID,
      secretChannelUserID,
    );
    expect(permissionAfterRemoveRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(permissionAfterRemoveRes?.data?.permissions).toStrictEqual(WITHOUT_PERMISSION);

    // 4. 添加权限
    const addPermissionRes = await client.channelPermissionsApi.putChannelPermissions(
      secretChannelID,
      secretChannelUserID,
      {
        remove: '0',
        add: '1',
      },
    );
    expect(addPermissionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    // 5. 验证修改是否成功
    const permissionAfterAddRes = await client.channelPermissionsApi.channelPermissions(
      secretChannelID,
      secretChannelUserID,
    );
    expect(permissionAfterAddRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(permissionAfterAddRes?.data?.permissions).toStrictEqual(WITH_PERMISSION);
  });

  // 必须是私密子频道（非所有人可访问）
  test('【 putChannelPermissions方法 】=== 修改指定子频道的权限（add、remove同时为1）', async () => {
    // 1. 获取原有权限（测试账号原有权限为1 即可以看到私密频道）
    const originPermissionRes = await client.channelPermissionsApi.channelPermissions(
      secretChannelID,
      secretChannelUserID,
    );
    expect(originPermissionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(originPermissionRes?.data?.permissions).toStrictEqual(WITH_PERMISSION);

    // 2. 移除权限 add、remove同时为1(同时为1表现为移除)
    const removePermissionRes = await client.channelPermissionsApi.putChannelPermissions(
      secretChannelID,
      secretChannelUserID,
      {
        remove: '1',
        add: '1',
      },
    );
    expect(removePermissionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    // 3. 验证修改是否成功
    const permissionAfterRemoveRes = await client.channelPermissionsApi.channelPermissions(
      secretChannelID,
      secretChannelUserID,
    );
    expect(permissionAfterRemoveRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(permissionAfterRemoveRes?.data?.permissions).toStrictEqual(WITHOUT_PERMISSION);

    // 4. 添加权限
    const addPermissionRes = await client.channelPermissionsApi.putChannelPermissions(
      secretChannelID,
      secretChannelUserID,
      {
        remove: '0',
        add: '1',
      },
    );
    expect(addPermissionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    // 5. 验证修改是否成功
    const permissionAfterAddRes = await client.channelPermissionsApi.channelPermissions(
      secretChannelID,
      secretChannelUserID,
    );
    expect(permissionAfterAddRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(permissionAfterAddRes?.data?.permissions).toStrictEqual(WITH_PERMISSION);
  });

  test('【 putChannelPermissions方法 】=== 参数错误情况', async () => {
    try {
      await client.channelPermissionsApi.putChannelPermissions(
        secretChannelID,
        secretChannelUserID,
        // @ts-ignore
        undefined,
      );
    } catch (error) {
      expect(error.toString()).toEqual('Error: invalid parameter');
    }
  });
});
