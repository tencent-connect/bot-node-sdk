import {
  GuildPermissionRes,
  GuildPermissionDemand,
  GuildPermissionsAPI,
  Config,
  OpenAPIRequest,
  PermissionDemandToCreate,
} from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class GuildPermissions implements GuildPermissionsAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 获取频道可用权限列表
  public permissions(guildID: string): Promise<RestyResponse<GuildPermissionRes>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildPermissionURI'),
      rest: {
        guildID,
      },
    };
    return this.request<GuildPermissionRes>(options);
  }

  // 创建频道 API 接口权限授权链接
  public postPermissionDemand(
    guildID: string,
    permissionDemandObj: PermissionDemandToCreate,
  ): Promise<RestyResponse<GuildPermissionDemand>> {
    const options = {
      method: 'POST' as const,
      url: getURL('guildPermissionDemandURI'),
      rest: {
        guildID,
      },
      data: permissionDemandObj,
    };
    return this.request<GuildPermissionDemand>(options);
  }
}
