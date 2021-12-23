# QQ频道机器人bot-node-sdk

用于开发QQ频道机器人

## 使用文档

[https://bot.q.qq.com/wiki/develop/nodesdk/](https://bot.q.qq.com/wiki/develop/nodesdk/)

## 使用方式

### 1、安装

```ts
npm install --save-dev @tencent-connect/bot-node-sdk
```

### 2、引用

```ts
import { creatOpenAPI, creatWebsocket } from '@tencent-connect/bot-node-sdk';
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

### 4、方法引用

```ts
const client = creatOpenAPI(botConfig);
const ws = creatWebsocket(botConfig);

// 消息监听
ws.on('Event_Wss', (eventData) => {
  console.log('[Event_Wss] 事件接收 :', eventData);
})
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
```

## 如何贡献

### 本地运行

```shell
npm run dev
npm link
```

### cd exmaple

```shell
npm link @tencent-connect/bot-node-sdk
```

### 调试

```shell
npm run example
```
