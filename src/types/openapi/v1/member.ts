import { RestyResponse } from 'resty-client';
import { IChannel } from './channel';

/**
 * =============  Member 成员接口  =============
 */
export interface MemberAPI {
  memberAddRole: (
    guildID: string,
    roleID: string,
    userID: string,
    /**  兼容原来传递 channel 对象的逻辑，后续仅支持 string */
    channel?: string | MemberAddRoleBody,
  ) => Promise<RestyResponse<any>>;
  memberDeleteRole: (
    guildID: string,
    roleID: string,
    userID: string,
    /**  兼容原来传递 channel 对象的逻辑，后续仅支持 string */
    channel?: string | MemberAddRoleBody,
  ) => Promise<RestyResponse<any>>;
}

// 身份组添加、删除成员 只需要传id
export type MemberAddRoleBody = Pick<IChannel, 'id'>;
