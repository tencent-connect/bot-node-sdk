import { RestyResponse } from 'resty-client';

/**
 * =============  PinsMessage 接口  =============
 */
export interface PinsMessageAPI {
  pinsMessage: (channelID: string) => Promise<RestyResponse<IPinsMessage>>;
  putPinsMessage: (channelID: string, messageID: string) => Promise<RestyResponse<IPinsMessage>>;
  deletePinsMessage: (channelID: string, messageID: string) => Promise<RestyResponse<any>>;
}

export interface IPinsMessage {
  guild_id: string;
  channel_id: string;
  message_ids: string[];
}
