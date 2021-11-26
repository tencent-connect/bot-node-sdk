import { AudioAPI } from '@src/types/openapi';

// 语音对象-参数
export interface AudioControl {
  audioUrl: string;
  text: string;
  status: number;
}

export default class Audio implements AudioAPI {
  // 执行音频播放，暂停等操作
  postAudio(channelID: string, value: AudioControl) {}
}
