import {AudioAPI, AudioControl, Config, OpenAPIRequest} from '@src/types';
import {RestyResponse} from 'resty-client';
import {apiMap, getURL} from './resource';

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
      url: this.getURL('audioControlURI'),
      rest: {
        channelID,
      },
      data: audioControl,
    };
    return this.request<AudioControl>(options);
  }

  private getURL(url: keyof typeof apiMap) {
    return getURL(this.config.sandbox)(url)
  }
}
