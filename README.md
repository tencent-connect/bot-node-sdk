# QQ频道机器人bot-node-sdk
用于开发QQ频道机器人

## 使用方式
### 1、安装：
```ts
npm install --save-dev @tencent/bot-node-sdk
```
### 2、引用：
```ts
import { creatOpenAPI, creatWebsocket } from '@tencent/bot-node-sdk';
```
### 3、配置入参
```ts
const botConfig = {
  appID: '',
  token: '',
  intents: ['GUILDS', 'GUILD_MEMBERS', 'DIRECT_MESSAGE', 'AUDIO_ACTION', 'AT_MESSAGES'],
};
```
appID: [QQ频道机器人开发者管理端](https://bot.q.qq.com)申请机器人时获取到的机器人ID

token: [QQ频道机器人开发者管理端](https://bot.q.qq.com)申请机器人时获取到的机器人token

intents: [事件订阅](https://group_pro.pages.woa.com/_book/gateway/intents.html)用于开启可接收的消息类型
### 4、方法引用：
```ts
const client = creatOpenAPI(botConfig);
const ws = creatWebsocket(botConfig);

// 消息监听
ws.on('READY', (eventData) => {
  console.log('[READY] 事件接收 :', eventData);
})
ws.on('ERROR', (eventData) => {
  console.log('[ERROR] 事件接收 :', eventData);
})
ws.on('GUILDS', (eventData) => {
  console.log('[GUILDS] 事件接收 :', eventData);
})
ws.on('GUILGUILD_MEMBERSDS', (eventData) => {
  console.log('[GUILGUILD_MEMBERSDS] 事件接收 :', eventData);
})
ws.on('DIRECT_MESSAGE', (eventData) => {
  console.log('[DIRECT_MESSAGE] 事件接收 :', eventData);
})
ws.on('AUDIO_ACTION', (eventData) => {
  console.log('[AUDIO_ACTION] 事件接收 :', eventData);
})
ws.on('AT_MESSAGES', (eventData) => {
  console.log('[AT_MESSAGES] 事件接收 :', eventData);
})

// API调用
client.guildApi.guild(guildID).then((res) => {
  console.log(JSON.stringify(res.data));
});
```
eventData中包含：

eventType: [消息事件类型](https://group_pro.pages.woa.com/_book/gateway/guild.html)

msg: 消息详情

client api 中包含基础 [API](https://group_pro.pages.woa.com/_book/openapi/guild/model.html)

## 如何贡献

```shell
// 本地运行
npm run dev
npm link
// cd exmaple
npm link @tencent/bot-node-sdk
// 调试
npm run example
```