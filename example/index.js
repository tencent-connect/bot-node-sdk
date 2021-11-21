import { Bot } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const QQBot = new Bot();
QQBot.newClient(testConfig);
QQBot.onmessage();
