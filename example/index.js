import { creatOpenAPI, creatWebsocket } from '@tencent-connect/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const client = creatOpenAPI(testConfig);

const testConfigWs = {
  appID: '',
  token: '',
  timeout: 3000,
};
const ws = creatWebsocket(testConfigWs);
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

client.guildApi.guild('').then((data) => {
  console.log(data);
});

// ✅
client.channelApi.channels(guildID).then((res) => {
  console.log(res.data);
});
