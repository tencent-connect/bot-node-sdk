'use strict';

// 延迟
export const delayTime = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 随机延迟
export const randomDelay =(min: number, max: number) => {
  let ms = Math.random() * (max - min) + min;
  ms = Math.ceil(ms);
  console.log(`delay for ${ms} ms ...`);
  return delayTime(ms);
}

// 字符串解析
export const resolveString = (data: any) => {
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) return data.join('\n');
  return String(data);
}

export const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
