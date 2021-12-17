import { getTimeStampNumber } from '@src/utils/utils';

describe('utils测试', () => {
  test('【 getTimeStampNumber方法 】=== 获取number类型的10位时间戳', () => {
    const res = getTimeStampNumber();
    expect(res.toString().length).toBe(10);
  });
});
