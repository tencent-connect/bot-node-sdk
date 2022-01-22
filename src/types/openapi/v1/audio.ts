import { RestyResponse } from 'resty-client';

//  ============= Audio 音频接口 =============
export interface AudioAPI {
  postAudio: (channelID: string, value: AudioControl) => Promise<RestyResponse<AudioControl>>;
}

// 语音对象-参数
export interface AudioControl {
  audioUrl: string;
  text: string;
  status: number;
}
