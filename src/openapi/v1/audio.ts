import { AudioAPI, Config, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

// 语音对象-参数
export interface AudioControl {
  audioUrl: string;
  text: string;
  status: number;
}

export default class Audio implements AudioAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 执行音频播放，暂停等操作
  postAudio(channelID: string, audioControl: AudioControl): Promise<RestyResponse<AudioControl>> {
    const options = {
      method: 'POST' as const,
      url: getURL('audioControlURI'),
      rest: {
        channelID,
      },
      data: {
        audioControl,
      },
    };
    return this.request<AudioControl>(options);
  }
}
