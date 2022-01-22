import { versionMapping } from '@src/openapi/openapi';
import { apiVersion, OpenAPI, v1Setup } from '@src/openapi/v1/openapi';

describe('openapi测试', () => {
  test('【 v1Setup方法 】=== 注册全局api', () => {
    expect(Object.keys(versionMapping).length).toBe(0);
    v1Setup();
    expect(versionMapping[apiVersion]).toEqual(OpenAPI);
  });
});
