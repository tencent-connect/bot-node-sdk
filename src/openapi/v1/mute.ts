import {Config, OpenAPIRequest, MuteAPI, MuteOptions} from '@src/types';
import {RestyResponse} from 'resty-client';
import {getURL} from './resource';

export default class Mute implements MuteAPI {
  public request: OpenAPIRequest;
  public config: Config;

  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 禁言某个member
  public muteMember(guildID: string, userID: string, options: MuteOptions): Promise<RestyResponse<any>> {
    if (!options) {
      return Promise.reject(new Error("'options' required!"));
    }

    const reqOptions = {
      method: 'PATCH' as const,
      url: getURL(this.config.sandbox)('muteMemberURI'),
      rest: {
        guildID,
        userID,
      },
      data: {
        mute_end_timestamp: options?.timeTo,
        mute_seconds: options?.seconds,
      },
    };
    return this.request(reqOptions);
  }

  // 禁言所有人
  public muteAll(guildID: string, options: MuteOptions): Promise<RestyResponse<any>> {
    if (!options) {
      return Promise.reject(new Error("'options' required!"));
    }

    const reqOptions = {
      method: 'PATCH' as const,
      url: getURL(this.config.sandbox)('muteURI'),
      rest: {
        guildID,
      },
      data: {
        mute_end_timestamp: options?.timeTo,
        mute_seconds: options?.seconds,
      },
    };
    return this.request(reqOptions);
  }
}
