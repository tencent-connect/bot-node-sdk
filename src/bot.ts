import { Config, v1Setup } from '@src/openapi/v1/openapi';
import { versionMapping } from '@src/openapi/openapi';
import { IOpenAPI } from './types/openapi';

function init() {
  // 注册v1接口
  v1Setup();
  // 注册websocket client实现
}
// 进行初始化
init();

let defaultImpl: any = null;

// SelectOpenAPIVersion 指定使用哪个版本的 api 实现，如果不指定，sdk将默认使用第一个 setup 的 api 实现
export function selectOpenAPIVersion(version: number) {
  if (!versionMapping[version]) {
    return false;
  }
  defaultImpl = versionMapping[version];
}
// 如果需要使用其他版本的实现，需要在调用这个方法之前调用 SelectOpenAPIVersion 方法

export function newOpenAPI(config: Config) {
  if (defaultImpl) {
    return defaultImpl.newClient(config);
  }
}
