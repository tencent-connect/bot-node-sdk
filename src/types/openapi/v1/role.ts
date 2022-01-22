import { RestyResponse } from 'resty-client';

/**
 * =============  Role 身份组接口  =============
 */
export interface RoleAPI {
  roles: (guildID: string) => Promise<RestyResponse<GuildRoles>>;
  postRole: (guildID: string, role: Omit<IRole, 'id'>, filter?: IRoleFilter) => Promise<RestyResponse<UpdateRoleRes>>;
  patchRole: (
    guildID: string,
    roleID: string,
    role: IRole,
    filter?: IRoleFilter,
  ) => Promise<RestyResponse<UpdateRoleRes>>;
  deleteRole: (guildID: string, roleID: string) => Promise<RestyResponse<any>>;
}

// 所创建的频道身份组对象
export interface IRole {
  id: string; // 身份组ID, 默认值可参考DefaultRoles
  name: string; // 名称
  color: number; // ARGB的HEX十六进制颜色值转换后的十进制数值
  hoist: number; // 是否在成员列表中单独展示: 0-否, 1-是
  number: number; // 人数 不会被修改，创建接口修改
  member_limit: number; // 成员上限 不会被修改，创建接口修改
}

// 指定创建、更新频道身份组涉及的字段
export interface IRoleFilter {
  name?: number;
  color?: number;
  hoist?: number;
}
export interface GuildRoles {
  guild_id: string; // 频道ID
  roles: IRole[]; // 一组频道身份组对象
  role_num_limit: string; // 默认分组上限
}

// UpdateResult 创建，删除等行为的返回
export interface UpdateRoleRes {
  role_id: string; // 身份组ID
  guild_id: string; // 频道ID
  role: IRole; // 所创建的频道身份组对象
}
