# QQ频道机器人bot-node-sdk
用于开发QQ频道机器人

## 使用方式
### 1、安装：
```ts
npm install --save-dev @tencent/bot-node-sdk
```
### 2、引用：
```ts
import { newOpenAPI, newWebsocket } from '@tencent/bot-node-sdk';
```
### 3、配置入参
```ts
const botConfig = {
  appID: '',
  token: '',
  shards: [0, 1],
};
```
appID: [QQ频道机器人开发者管理端](https://bot.q.qq.com)申请机器人时获取到的机器人ID

token: [QQ频道机器人开发者管理端](https://bot.q.qq.com)申请机器人时获取到的机器人token

shards: Websocket分片信息，暂时默认为1，即为单例模式，后续会进行优化
### 4、方法引用：
```ts
const client = newOpenAPI(botConfig);
const ws = newWebsocket(botConfig);

// 消息监听
ws.on('Event_Wss', (eventData) => {
  console.log('[Event_Wss] 事件接收 :', eventData);
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