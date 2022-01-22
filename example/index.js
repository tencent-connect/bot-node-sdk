// 以下仅为用法示意，详情请参照文档：https://bot.q.qq.com/wiki/develop/nodesdk/

import { createOpenAPI, createWebsocket } from 'qq-guild-bot';

const testConfig = {
  appID: 'APP_ID',
  token: 'TOKEN',
  // https://bot.q.qq.com/wiki/develop/api/gateway/intents.html
  intents: ['GUILDS', 'GUILD_MEMBERS', 'AUDIO_ACTION', 'AT_MESSAGES'],
};

// API
const client = createOpenAPI(testConfig);
client.guildApi.guild('GUILD_ID').then((data) => {
  console.log(data);
});

//WS
const ws = createWebsocket(testConfig);

ws.on('READY', (data) => {
  console.log('[READY] 事件接收 :', data);
});
ws.on('ERROR', (data) => {
  console.log('[ERROR] 事件接收 :', data);
});
ws.on('GUILDS', (data) => {
  console.log('[GUILDS] 事件接收 :', data);
});
ws.on('GUILGUILD_MEMBERSDS', (data) => {
  console.log('[GUILGUILD_MEMBERSDS] 事件接收 :', data);
});
ws.on('DIRECT_MESSAGE', (data) => {
  console.log('[DIRECT_MESSAGE] 事件接收 :', data);
});
ws.on('AUDIO_ACTION', (data) => {
  console.log('[AUDIO_ACTION] 事件接收 :', data);
});
ws.on('AT_MESSAGES', (data) => {
  console.log('[AT_MESSAGES] 事件接收 :', data);
});

