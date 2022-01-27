import { RestyResponse } from 'resty-client';

/**
 * =============  GuildPermission API权限接口  =============
 */
export interface GuildPermissionsAPI {
  permissions: (guildID: string) => Promise<RestyResponse<GuildPermissionRes>>;
  postPermissionDemand: (
    guildID: string,
    permissionDemandObj: PermissionDemandToCreate,
  ) => Promise<RestyResponse<GuildPermissionDemand>>;
}

export interface GuildPermission {
  path: string; // API 接口名，例如 /guilds/{guild_id}/members/{user_id}
  method: string; // 请求方法，例如 GET
  desc: string; // API 接口名称，例如 获取频道信
  auth_status: number; // 授权状态，auth_stats 为 1 时已授权
}

export interface GuildPermissionRes {
  apis: GuildPermission[];
}

export interface GuildPermissionDemand {
  guild_id: string; // 申请接口权限的频道 id
  channel_id: string; // 接口权限需求授权链接发送的子频道 id
  api_identify: GuildPermissionDemandIdentify; // 权限接口唯一标识
  title: string; // 接口权限链接中的接口权限描述信息
  desc: string; // 接口权限链接中的机器人可使用功能的描述信息
}

export interface PermissionDemandToCreate {
  channel_id: string; // 授权链接发送的子频道 ID
  api_identify: GuildPermissionDemandIdentify; // api 权限需求标识对象
  desc?: string; // 机器人申请对应的 API 接口权限后可以使用功能的描述
}

export interface GuildPermissionDemandIdentify {
  path: string; // API 接口名，例如 /guilds/{guild_id}/members/{user_id}
  method: string; // 请求方法，例如 GET
}
