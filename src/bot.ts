import { v1Setup } from '@src/openapi/v1/openapi';
import { versionMapping } from '@src/openapi/openapi';
import { IOpenAPI } from './types/openapi';

function init() {
  // 注册v1接口
  v1Setup();
  // 注册websocket client实现
}

let defaultImpl: null | IOpenAPI = null;

function selectOpenAPIVersion(version: number) {
  if (!versionMapping[version]) {
    return false;
  }
  defaultImpl = versionMapping[version];
}

// newOpenAPI 创建新的 openapi 实例，会返回当前的 openapi 实现的实例
// 如果需要使用其他版本的实现，需要在调用这个方法之前调用 SelectOpenAPIVersion 方法
function newOpenAPI() {
  return defaultImpl?.new();
}
