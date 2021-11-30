import { newOpenAPI, newWebsocket } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const client = newOpenAPI(testConfig);

const testConfigWs = {
  appID: '',
  token: '',
  timeout: 3000,
  shards: [0, 1],
}
const ws = newWebsocket(testConfigWs);
ws.on('Event_Wss', (data) => {
  console.log('-----接口暴露收到消息-----', data);
})

client.guildApi.guild('').then((data) => {
  console.log(data);
});

// ✅
client.channelApi.channels(guildID).then((res) => {
  console.log(res.data);
});
