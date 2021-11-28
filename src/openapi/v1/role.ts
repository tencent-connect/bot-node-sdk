import { Config, OpenAPIRequest, RoleAPI } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export interface IRole {
  id: string;
  name: string;
  color: number;
  hoist: number;
  number: number; // 不会被修改，创建接口修改
  member_limit: number; // 不会被修改，创建接口修改
}
export interface GuildRoles {
  guild_id: string;
  roles: IRole[];
  role_num_limit: string;
}
export default class Role implements RoleAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
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
  public postRole(guildID: string, role: IRole): Promise<RestyResponse<string>> {
    if (role.color === 0) {
      // TODO DefaultColor:4278245297
      role.color = 4278245297;
    }
    // openapi 上修改哪个字段，就需要传递哪个 filter
    const filter = {
      name: 1,
      color: 1,
      moist: 1,
    };
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
    // TODO Debug logger
    // TODO fix resty-client interface
    return this.request<any>(options);
  }

  public patchRole(guildID: string, roleID: string, role: IRole): Promise<RestyResponse<string>> {
    if (role.color === 0) {
      // TODO DefaultColor:4278245297
      role.color = 4278245297;
    }
    // openapi 上修改哪个字段，就需要传递哪个 filter
    const filter = {
      name: 1,
      color: 1,
      moist: 1,
    };
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
    return this.request<any>(options);
  }

  public deleteRole(guildID: string, roleID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'PATCH' as const,
      url: getURL('roleURI'),
      rest: {
        guildID,
        roleID,
      },
    };
    return this.request(options);
  }
}
