import { client, channelID, REQUEST_SUCCESS_CODE } from '../config';

describe('audio测试', () => {
  enum AudioPlayStatus {
    START = 0, // 开始播放
    PAUSE = 1, // 暂停播放
    RESUME = 2, // 继续播放
    STOP = 3, // 停止播放
  }
  test('【 postAudio方法 】=== 开始播放操作', async () => {
    const audioControl = {
      audioUrl: '',
      text: '',
      status: AudioPlayStatus.START,
    }
    const res = await client.audioApi.postAudio(channelID, audioControl);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  test('【 postAudio方法 】=== 暂停播放操作', async () => {
    const audioControl = {
      audioUrl: '',
      text: '',
      status: AudioPlayStatus.PAUSE,
    }
    const res = await client.audioApi.postAudio(channelID, audioControl);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  test('【 postAudio方法 】=== 继续播放操作', async () => {
    const audioControl = {
      audioUrl: '',
      text: '',
      status: AudioPlayStatus.RESUME,
    }
    const res = await client.audioApi.postAudio(channelID, audioControl);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  test('【 postAudio方法 】=== 停止播放操作', async () => {
    const audioControl = {
      audioUrl: '',
      text: '',
      status: AudioPlayStatus.STOP,
    }
    const res = await client.audioApi.postAudio(channelID, audioControl);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  test('【 botOnMic方法 】=== 机器人上麦', async () => {
    const res = await client.audioApi.botOnMic(channelID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });

  test('【 botOffMic方法 】=== 机器人下麦', async () => {
    const res = await client.audioApi.botOffMic(channelID);
    expect(res?.status).toStrictEqual(REQUEST_SUCCESS_CODE);
  });
});
