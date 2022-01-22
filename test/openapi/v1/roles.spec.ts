import { defaultColor } from '@src/openapi/v1/role';
import { client, REQUEST_SUCCESS_CODE, guildID, REQUEST_SUCCESS_CODE_WITH_NO_CONTENT } from '../config';

describe('roles测试', () => {
  test('【 roles方法 】=== 获取频道身份组列表', async () => {
    const res = await client.roleApi.roles(guildID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(res?.data?.guild_id).toStrictEqual(guildID);
  });

  test('【 roles方法 】=== 创建、修改、删除频道身份组列表', async () => {
    // 1 原始的列表
    const originRoleRes = await client.roleApi.roles(guildID);
    const originRoleList = originRoleRes.data.roles;

    //  ==== 使用传入color ====

    // 2.1 新增身份组(color自定义)
    const postRoleName = 'post_role_name';
    const postRoleRes = await client.roleApi.postRole(guildID, {
      ...originRoleList[0],
      name: postRoleName,
    });

    // 2.2 验证新增结果  status、roleid
    expect(postRoleRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(postRoleRes?.data.role_id).toBeTruthy();
    const postRoleId = postRoleRes.data.role_id;

    // 2.3 修改身份组
    const patchRoleName = 'patch_role_nme';
    const patchRes = await client.roleApi.patchRole(guildID, postRoleId, {
      ...postRoleRes?.data?.role,
      name: patchRoleName,
    });

    // 2.4 验证修改结果
    expect(patchRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(patchRes.data.role.name).toStrictEqual(patchRoleName);

    // 2.5 删除新增的身份组
    const deleteRoleRes = await client.roleApi.deleteRole(guildID, postRoleId);
    expect(deleteRoleRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);

    //  ==== 使用默认color ====

    // 3.1 新增身份组(color默认)
    const postRoleWithDefaultColorRes = await client.roleApi.postRole(guildID, {
      ...originRoleList[0],
      name: postRoleName,
      color: 0,
    });

    // 3.2 验证新增结果  status、roleid
    expect(postRoleWithDefaultColorRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(postRoleWithDefaultColorRes?.data.role_id).toBeTruthy();
    const postRoleWithDefaultColorId = postRoleWithDefaultColorRes.data.role_id;

    // 3.3 修改身份组(color默认)
    const patchWithDefaultColorRes = await client.roleApi.patchRole(guildID, postRoleWithDefaultColorId, {
      ...postRoleWithDefaultColorRes?.data?.role,
      name: patchRoleName,
      color: 0,
    });

    // 3.4 验证修改结果
    expect(patchWithDefaultColorRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(patchWithDefaultColorRes.data.role.name).toStrictEqual(patchRoleName);
    expect(patchWithDefaultColorRes.data.role.color).toStrictEqual(defaultColor);

    // 3.5 删除新增的身份组
    const deleteRoleWithDefaultColorRes = await client.roleApi.deleteRole(guildID, postRoleWithDefaultColorId);
    expect(deleteRoleWithDefaultColorRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE_WITH_NO_CONTENT);
  });
});
