import { getURL } from '@src/openapi/v1/resource';

describe('resource测试', () => {
  // 可以将resource中的变量导出 在此使用
  test('【 getURL方法 】=== 获取HTTP请求URL', async () => {
    const endpoint = 'gatewayBotURI';
    const sandboxString = 'sandbox';
    const res = getURL(endpoint, true);
    expect(res).toContain(sandboxString);
  });
});
