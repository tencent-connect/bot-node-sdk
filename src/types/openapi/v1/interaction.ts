import { RestyResponse } from 'resty-client';

/**
 * =============  Interaction 接口  =============
 */
export interface InteractionAPI {
  postInteraction: (interactionID: string, code: boolean) => Promise<RestyResponse<any>>;
}
