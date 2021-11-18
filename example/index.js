import { QQBot } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const QQ = new QQBot();
QQ.newClient(testConfig);
