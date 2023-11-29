// 以下仅为用法示意，详情请参照文档：https://bot.q.qq.com/wiki/develop/nodesdk/
const { createOpenAPI, createWebsocket, AvailableIntentsEventsEnum } = require('qq-guild-bot');

const testConfigWs = {
  appID: '',
  token: '',
  intents: [],
};

const client = createOpenAPI(testConfigWs);

const ws = createWebsocket(testConfigWs);
ws.on('READY', (wsdata) => {
  console.log('[READY] 事件接收 :', wsdata);
});

ws.on(AvailableIntentsEventsEnum.ERROR, (data) => {
  console.log('[ERROR] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.GUILDS, (data) => {
  console.log('[GUILDS] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.GUILD_MEMBERS, (data) => {
  console.log('[GUILD_MEMBERS] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.GUILD_MESSAGES, (data) => {
  console.log('[GUILD_MESSAGES] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS, (data) => {
  console.log('[GUILD_MESSAGE_REACTIONS] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.DIRECT_MESSAGE, (data) => {
  console.log('[DIRECT_MESSAGE] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.INTERACTION, (data) => {
  console.log('[INTERACTION] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.MESSAGE_AUDIT, (data) => {
  console.log('[MESSAGE_AUDIT] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.FORUMS_EVENT, (data) => {
  console.log('[FORUMS_EVENT] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.AUDIO_ACTION, (data) => {
  console.log('[AUDIO_ACTION] 事件接收 :', data);
});
ws.on(AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES, async (eventData) => {
  console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', eventData);
  const { data } = await client.messageApi.postMessage('', {
    content: 'test'
  })
  console.log(data);
});
ws.on(AvailableIntentsEventsEnum.GROUP, (data) => {
  console.log('[GROUP] 事件接收 :', data);
});

// client.guildApi.guild('').then((data) => {
//   console.log(data);
// });

// // ✅
// client.channelApi.channels(guildID).then((res) => {
//   console.log(res.data);
// });
