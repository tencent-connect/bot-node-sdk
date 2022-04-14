import { RestyResponse } from 'resty-client';

/**
 * =============  Interaction 接口  =============
 */
export interface InteractionAPI {
  putInteraction: (interactionID: string, code: CodeObj) => Promise<RestyResponse<any>>;
}

export interface CodeObj {
  code: number; // 一般设置 1
}
