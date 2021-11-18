import { register } from '@src/openapi/openapi';

export const apiVersion = 1;

// TODO 全部的聚合API
const openapi = {} as any;
export function v1Setup() {
  register(apiVersion, openapi);
}
