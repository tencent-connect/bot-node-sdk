import { apiVersion, OpenAPI, v1Setup } from '@src/openapi/v1/openapi';
import { versionMapping } from '@src/openapi/openapi';
import { APIVersion, Config } from './types/openapi';
import { GetWsParam } from '@src/types';
import WebsocketClient from './client/client';

// 注册v1接口
v1Setup();

let defaultImpl = versionMapping[apiVersion] as typeof OpenAPI;

// SelectOpenAPIVersion 指定使用哪个版本的 api 实现，如果不指定，sdk将默认使用第一个 setup 的 api 实现
export function selectOpenAPIVersion(version: APIVersion) {
  if (!versionMapping[version]) {
    return false;
  }
  defaultImpl = versionMapping[version];
}
// 如果需要使用其他版本的实现，需要在调用这个方法之前调用 SelectOpenAPIVersion 方法
export function createOpenAPI(config: Config) {
  return defaultImpl.newClient(config);
}
// ws连接新建
export function createWebsocket(config: GetWsParam) {
  return new WebsocketClient(config);
}
