import { AudioAPI, AudioControl, Config, OpenAPIRequest } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class Audio implements AudioAPI {
  public request: OpenAPIRequest;
  public config: Config;
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
      data: audioControl,
    };
    return this.request<AudioControl>(options);
  }
  // 机器人上麦
  botOnMic(channelID: string): Promise<RestyResponse<{}>> {
    const options = {
      method: 'PUT' as const,
      url: getURL('botMic'),
      rest: {
        channelID,
      },
      data: {},
    };
    return this.request<{}>(options);
  }
  // 机器人下麦
  botOffMic(channelID: string): Promise<RestyResponse<{}>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('botMic'),
      rest: {
        channelID,
      },
      data: {},
    };
    return this.request<{}>(options);
  }
}
