// 以下仅为用法示意，详情请参照文档：https://bot.q.qq.com/wiki/develop/nodesdk/

const fs = require('fs');
const path = require('path');
const { createOpenAPI, createWebsocket } = require('../lib/index.js');

let config = {};
// config.json需要您用自己的机器人信息配置
const configPath = path.join(__dirname, 'config.json');
if (fs.existsSync(configPath)) {
  config = fs.readFileSync(configPath).toString();
  config = JSON.parse(config);
}

console.log(`config信息：\n\n ${JSON.stringify(config)} \n`);

(async function () {
  // API Demo
  const client = createOpenAPI(config);
  let res = await client.meApi.me();
  console.log(`\n meApi.me() res: \n\n ${JSON.stringify(res.data)} \n`);

  res = await client.meApi.meGuilds();
  console.log(`\n meApi.meGuilds() res: \n\n ${JSON.stringify(res.data)} \n`);

  //WS Demo
  const ws = createWebsocket(config);
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
    const msg = data.msg;
    client.messageApi.postMessage(msg.channel_id, {
      content: `<@!${msg.author.id}> hi 收到你的消息啦`,
      msg_id: msg.id,
    });
  });
})();
