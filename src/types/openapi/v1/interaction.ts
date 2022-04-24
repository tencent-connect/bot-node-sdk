import { RestyResponse } from 'resty-client';

/**
 * =============  Interaction 接口  =============
 */
export interface InteractionAPI {
  putInteraction: (interactionID: string, interactionData: InteractionData) => Promise<RestyResponse<any>>;
}

export interface InteractionData {
  code: number; // 0成功,1操作失败,2操作频繁,3重复操作,4没有权限,5仅管理员操作
}
