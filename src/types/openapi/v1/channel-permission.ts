import { RestyResponse } from 'resty-client';

/**
 * =============  ChannelPermissions 子频道权限接口  =============
 */
export interface ChannelPermissionsAPI {
  // ChannelPermissions 获取指定子频道的权限
  channelPermissions: (channelID: string, userID: string) => Promise<RestyResponse<IChannelPermissions>>;
  // PutChannelPermissions 修改指定子频道的权限
  putChannelPermissions: (
    channelID: string,
    userID: string,
    p: UpdateChannelPermissions,
  ) => Promise<RestyResponse<any>>;

  // ChannelRolePermissions 获取指定子频道身份组的权限
  channelRolePermissions: (channelID: string, roleID: string) => Promise<RestyResponse<IChannelRolePermissions>>;
  // PutChannelRolePermissions 修改指定子频道身份组的权限
  putChannelRolePermissions: (
    channelID: string,
    roleID: string,
    p: UpdateChannelPermissions,
  ) => Promise<RestyResponse<any>>;
}

export interface IChannelPermissions {
  channel_id: string;
  user_id: string;
  permissions: string;
}

export interface IChannelRolePermissions {
  channel_id: string;
  role_id: string;
  permissions: string;
}

export interface UpdateChannelPermissions {
  add: string;
  remove: string;
}
