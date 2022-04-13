import { Config, OpenAPIRequest, InteractionAPI } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class Interaction implements InteractionAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 异步更新交互数据
  public postInteraction(interactionID: string, code: boolean): Promise<RestyResponse<any>> {
    const params = Object.create(null);
    if (code) {
      params.code = 1;
    } else {
      params.code = 0;
    }
    const options = {
      method: 'PUT' as const,
      url: getURL('interactionURI'),
      rest: {
        interactionID: interactionID,
      },
      params,
    };
    return this.request(options);
  }
}
