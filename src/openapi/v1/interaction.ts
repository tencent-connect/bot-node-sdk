import { Config, OpenAPIRequest, InteractionAPI, InteractionData } from '@src/types';
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
  public putInteraction(interactionID: string, interactionData: InteractionData): Promise<RestyResponse<any>> {
    const options = {
      method: 'PUT' as const,
      url: getURL('interactionURI'),
      headers: {
        'Content-Type': 'none',
      },
      rest: {
        interactionID,
      },
      data: interactionData,
    };
    return this.request(options);
  }
}
