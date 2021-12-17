import { getTimeStampNumber } from '@src/utils/utils';
import { client, guildID, channelID, REQUEST_SUCCESS_CODE } from '../config';

describe('channel测试', () => {
  test('【 channel方法 】=== 获取子频道信息', async () => {
    const res = await client.channelApi.channel(channelID);
    expect(res?.data?.id).toStrictEqual(channelID);
  });

  test('【 channels方法 】=== 获取频道下的子频道列表', async () => {
    const res = await client.channelApi.channels(guildID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  // 后续可补全其他类型
  test('【 postChannel方法 】=== 创建、修改、删除子频道（文字）', async () => {
    // 1.1 创建子频道(position非零)
    const postChannelName = 'post_channel_name';
    const patchChannelName = 'patch_channel_name';
    const postChannelRes = await client.channelApi.postChannel(guildID, {
      name: postChannelName,
      type: 0, // 文字子频道
      position: getTimeStampNumber(), // 排序位置为1
      parent_id: '0', // 父亲频道id为0
      owner_id: '0', // 拥有者id
      sub_type: 0, // 闲聊子频道
    });
    const postChannelId = postChannelRes?.data?.id;
    expect(postChannelRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(postChannelRes?.data?.name).toStrictEqual(postChannelName);

    // 1.2 创建子频道(position是零)
    const postChannelWithZeroPositionRes = await client.channelApi.postChannel(guildID, {
      name: postChannelName,
      type: 0, // 文字子频道
      position: 0, // 排序位置为1
      parent_id: '0', // 父亲频道id为0
      owner_id: '0', // 拥有者id
      sub_type: 0, // 闲聊子频道
    });
    const postChannelWithZeroPositionId = postChannelWithZeroPositionRes?.data?.id;
    expect(postChannelWithZeroPositionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(postChannelWithZeroPositionRes?.data?.name).toStrictEqual(postChannelName);

    // 2.获取创建的自频道信息
    const newChannelInfo = (await client.channelApi.channel(postChannelId))?.data;

    // 3.1修改子频道(position非零)
    const patchChannelRes = await client.channelApi.patchChannel(postChannelId, {
      ...newChannelInfo,
      name: patchChannelName,
    });
    expect(patchChannelRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(patchChannelRes?.data?.id).toStrictEqual(postChannelId);
    expect(patchChannelRes?.data?.name).toStrictEqual(patchChannelName);

    // 3.2修改子频道（position为0）
    const patchChannelWithZeroPositionRes = await client.channelApi.patchChannel(postChannelId, {
      ...newChannelInfo,
      position: 0,
    });
    expect(patchChannelWithZeroPositionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(patchChannelWithZeroPositionRes?.data?.id).toStrictEqual(postChannelId);
    expect(patchChannelWithZeroPositionRes?.data?.position).not.toStrictEqual(postChannelRes?.data?.position);

    // 4 删除子频道
    const deleteChannelRes = await client.channelApi.deleteChannel(postChannelId);
    expect(deleteChannelRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(deleteChannelRes?.data?.id).toStrictEqual(postChannelId);

    const deleteChannelWithZeroPositionRes = await client.channelApi.deleteChannel(postChannelWithZeroPositionId);
    expect(deleteChannelWithZeroPositionRes?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
    expect(deleteChannelWithZeroPositionRes?.data?.id).toStrictEqual(postChannelWithZeroPositionId);
  });
});
