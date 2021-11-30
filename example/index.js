import { newOpenAPI, newWss } from '@tencent/bot-node-sdk';

const testConfig = {
  BotAppID: '',
  BotToken: '',
};

const client = newOpenAPI(testConfig);
// const ws = newWss(testConfig);

client.guildApi.guild('').then((data) => {
  console.log(data);
});

// ✅
client.channelApi.channels(guildID).then((res) => {
  console.log(res.data);
});
