import { newOpenAPI, Bot } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

// const QQBot = new Bot(testConfig);
// // 用户获取频道
// // console.log(QQBot);
// // QQBot.getGuild();
// QQBot.onmessage();
const client = newOpenAPI(testConfig);

client.guildApi.guild('').then((data) => {
  console.log(data);
});
// // 用户获取频道clear
// // QQBot.getGuild();
// QQBot.onmessage((data) => {
//   console.log('机器人实例收到的消息', data);
// });
