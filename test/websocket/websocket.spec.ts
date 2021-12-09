import { Ws } from '@src/client/websocket/websocket';
import { apiTestConfig } from '../../test-config/api-config';

describe('websocket测试', () => {
  const config = {
    BotAppID: '',
    BotToken: '',
    shards: [0, 10],
  };
  const event = null;
  const ws = new Ws(apiTestConfig, event);

  test('【 checkShards方法 】=== shards不合法', () => {
    const shardsArr = null;
    const res = ws.checkShards(shardsArr as unknown as Array<number>);
    expect(res).toStrictEqual(console.log('shards 不存在'));
  });

  test('【 checkShards方法 】=== shards不存在', () => {
    const shardsArr = undefined;
    const res = ws.checkShards(shardsArr as unknown as Array<number>);
    expect(res).toStrictEqual(console.log('shards 不存在'));
  });

  test('【 checkShards方法 】=== shards错误', () => {
    const shardsArr = 'test';
    const res = ws.checkShards(shardsArr as unknown as Array<number>);
    expect(res).toStrictEqual(console.log('shards 错误'));
  });

  test('【 checkShards方法 】=== shards类型错误', () => {
    const shardsArr = 'test';
    const res = ws.checkShards(shardsArr as unknown as Array<number>);
    expect(res).toStrictEqual(console.log('shards 错误'));
  });

  test('【 checkShards方法 】=== shards入参错误，数组两个元素相等', () => {
    const shardsArr = [0, 0];
    const res = ws.checkShards(shardsArr);
    expect(res).toStrictEqual(console.log('shards 错误'));
  });

  test('【 checkShards方法 】=== shards入参错误，数组第一个元素比第二个元素大', () => {
    const shardsArr = [4, 0];
    const res = ws.checkShards(shardsArr);
    expect(res).toStrictEqual(console.log('shards 错误'));
  });

  test('【 checkShards方法 】=== 正确', () => {
    const shardsArr = [0, 4];
    const res = ws.checkShards(shardsArr);
    expect(res).toStrictEqual([0, 4]);
  });
});
