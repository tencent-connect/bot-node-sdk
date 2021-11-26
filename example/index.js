import { newOpenAPI } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const QQBot = new Bot(testConfig);
// 用户获取频道
// console.log(QQBot);
// QQBot.getGuild();
QQBot.onmessage();
const api = newOpenAPI(testConfig);

api.guild(123).then((data) => {
  console.log(data);
});
// // 用户获取频道
// // QQBot.getGuild();
// QQBot.onmessage((data) => {
//   console.log('机器人实例收到的消息', data);
// });
