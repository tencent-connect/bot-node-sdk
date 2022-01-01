import { Config, OpenAPIRequest, GuildRoles, IRole, IRoleFilter, RoleAPI, UpdateRoleRes } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

// 默认的filter：0 1 代表是否设置 0-否 1-是
export const defaultFilter: IRoleFilter = {
  name: 1,
  color: 1,
  hoist: 1,
};

// 用户组默认颜色值
export const defaultColor = 4278245297;
export default class Role implements RoleAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 获取频道身份组列表
  public roles(guildID: string): Promise<RestyResponse<GuildRoles>> {
    const options = {
      method: 'GET' as const,
      url: getURL('rolesURI'),
      rest: {
        guildID,
      },
    };
    return this.request<GuildRoles>(options);
  }

  // 创建频道身份组
  public postRole(
    guildID: string,
    role: Omit<IRole, 'id'>,
    filter = defaultFilter,
  ): Promise<RestyResponse<UpdateRoleRes>> {
    if (role.color === 0) {
      role.color = defaultColor;
    }
    const options = {
      method: 'POST' as const,
      url: getURL('rolesURI'),
      rest: {
        guildID,
      },
      data: {
        guild_id: guildID,
        filter,
        info: role,
      },
    };
    return this.request<UpdateRoleRes>(options);
  }

  // 修改频道身份组
  public patchRole(
    guildID: string,
    roleID: string,
    role: IRole,
    filter = defaultFilter,
  ): Promise<RestyResponse<UpdateRoleRes>> {
    if (role.color === 0) {
      role.color = defaultColor;
    }

    const options = {
      method: 'PATCH' as const,
      url: getURL('roleURI'),
      rest: {
        guildID,
        roleID,
      },
      data: {
        guild_id: guildID,
        filter,
        info: role,
      },
    };
    return this.request<UpdateRoleRes>(options);
  }

  // 删除频道身份组
  public deleteRole(guildID: string, roleID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('roleURI'),
      rest: {
        guildID,
        roleID,
      },
    };
    return this.request(options);
  }
}
