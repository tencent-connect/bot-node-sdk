import { Bot } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const QQBot = new Bot();
QQBot.newClient(testConfig);
// 用户获取频道
// QQBot.getGuild();
QQBot.onmessage((data) => {
  console.log('机器人实例收到的消息', data);
});
