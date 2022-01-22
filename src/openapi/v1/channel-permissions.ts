import {
  OpenAPIRequest,
  Config,
  ChannelPermissionsAPI,
  IChannelPermissions,
  IChannelRolePermissions,
  UpdateChannelPermissions,
} from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';
export default class ChannelPermissions implements ChannelPermissionsAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 获取指定子频道的权限
  public channelPermissions(channelID: string, userID: string): Promise<RestyResponse<IChannelPermissions>> {
    const options = {
      method: 'GET' as const,
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID,
      },
    };
    return this.request<IChannelPermissions>(options);
  }

  // 修改指定子频道的权限
  public putChannelPermissions(
    channelID: string,
    userID: string,
    p: UpdateChannelPermissions,
  ): Promise<RestyResponse<any>> {
    try {
      // 校验参数
      parseInt(p.add, 10);
      parseInt(p.remove, 10);
    } catch (error) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const options = {
      method: 'PUT' as const,
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID,
      },
      data: p,
    };
    return this.request<IChannelPermissions>(options);
  }

  // 获取指定子频道身份组的权限
  public channelRolePermissions(channelID: string, roleID: string): Promise<RestyResponse<IChannelRolePermissions>> {
    const options = {
      method: 'GET' as const,
      url: getURL('channelRolePermissionsURI'),
      rest: {
        channelID,
        roleID,
      },
    };
    return this.request<IChannelRolePermissions>(options);
  }

  // 修改指定子频道身份组的权限
  public putChannelRolePermissions(
    channelID: string,
    roleID: string,
    p: UpdateChannelPermissions,
  ): Promise<RestyResponse<any>> {
    try {
      // 校验参数
      parseInt(p.add, 10);
      parseInt(p.remove, 10);
    } catch (error) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const options = {
      method: 'PUT' as const,
      url: getURL('channelRolePermissionsURI'),
      rest: {
        channelID,
        roleID,
      },
      data: p,
    };
    return this.request<IChannelRolePermissions>(options);
  }
}
