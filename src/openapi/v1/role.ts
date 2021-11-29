import { Config, OpenAPIRequest, RoleAPI } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

// 用户组默认颜色值
const defaultColor = 4278245297;
// 所创建的频道身份组对象
export interface IRole {
  id: string; // 身份组ID, 默认值可参考DefaultRoles
  name: string; // 名称
  color: number; // ARGB的HEX十六进制颜色值转换后的十进制数值
  hoist: number; // 是否在成员列表中单独展示: 0-否, 1-是
  number: number; // 人数 不会被修改，创建接口修改
  member_limit: number; // 成员上限 不会被修改，创建接口修改
}
export interface GuildRoles {
  guild_id: string; // 频道ID
  roles: IRole[]; // 一组频道身份组对象
  role_num_limit: string; // 默认分组上限
}

// UpdateResult 创建，删除等行为的返回
export interface UpdateResult {
  role_id: string; // 身份组ID
  guild_id: string; // 频道ID
  role: IRole; // 所创建的频道身份组对象
}
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
  public postRole(guildID: string, role: IRole): Promise<RestyResponse<UpdateResult>> {
    if (role.color === 0) {
      role.color = defaultColor;
    }
    // openapi 上修改哪个字段，就需要传递哪个filter
    // 0 1 代表是否设置 0-否 1-是
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
    return this.request<UpdateResult>(options);
  }

  // 修改频道身份组
  public patchRole(guildID: string, roleID: string, role: IRole): Promise<RestyResponse<UpdateResult>> {
    if (role.color === 0) {
      role.color = defaultColor;
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
    return this.request<UpdateResult>(options);
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
