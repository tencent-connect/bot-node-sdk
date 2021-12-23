# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.3](https://github.com/tencent-connect/bot-node-sdk/compare/v1.1.2...v1.1.3) (2021-12-23)


### Bug Fixes

* 修复ws模块拼写错误 ([5ed1edf](https://github.com/tencent-connect/bot-node-sdk/commit/5ed1edfba07824373f1b0a6c482608d96c9acefb))

### [1.1.2](https://github.com/tencent-connect/bot-node-sdk/compare/v1.1.0...v1.1.2) (2021-12-22)


### Bug Fixes

* 配置文件修改 ([ea84dd7](https://github.com/tencent-connect/bot-node-sdk/commit/ea84dd7c083258ea334d3792bbd141114b2266f2))
* 去除多余文件 ([ae367b4](https://github.com/tencent-connect/bot-node-sdk/commit/ae367b42d9a894fbf12baadf27b95a1cdde1caef))
* support for  passing  filter params when post & patch role ([1f66b6c](https://github.com/tencent-connect/bot-node-sdk/commit/1f66b6cf0ec3b7c903092e364365b9d738de2531))

### [1.1.1](https://github.com/tencent-connect/bot-node-sdk/compare/v1.1.0...v1.1.1) (2021-12-22)


### Bug Fixes

* support for  passing  filter params when post & patch role ([1f66b6c](https://github.com/tencent-connect/bot-node-sdk/commit/1f66b6cf0ec3b7c903092e364365b9d738de2531))
* 去除多余文件 ([ae367b4](https://github.com/tencent-connect/bot-node-sdk/commit/ae367b42d9a894fbf12baadf27b95a1cdde1caef))
* 配置文件修改 ([ea84dd7](https://github.com/tencent-connect/bot-node-sdk/commit/ea84dd7c083258ea334d3792bbd141114b2266f2))

## [1.1.0](https://git.woa.com/qq-channel-bot/bot-node-sdk/compare/v1.0.0...v1.1.0) (2021-12-09)


### Features

* 去除APPID/token等信息 ([9997c5b](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/9997c5b4a972cbb3c1e399f3ee6259594d8af587))
* 修改ws信息获取时的鉴权信息 ([bcd1521](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/bcd152139458243628b1582c7719c2878b09b4be))
* ws断线优化,事件分发优化 ([ccfab14](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/ccfab14faa843156c543e8526a1226df26d22622))

## 1.0.0 (2021-12-03)


### Features

* 代码优化 ([dc30d86](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/dc30d869c7b48f9bc3ad23afe2ddedb80fcb1e6e))
* 代码优化 ([65df46e](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/65df46e7c3615684385dbdfc631a305637f0bb0c))
* 底层会话优化 ([473b6f7](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/473b6f7f0b1ef90fcf4416ee84f5dca6c83ef74e))
* 功能优化 ([2a9545d](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/2a9545d2770da9b8b32bebbdeecf9a733cacc0d0))
* 会话优化 ([7c042a2](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/7c042a20d503ad6dedf833d837f418221445a157))
* 结构调整 ([b36bc04](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/b36bc0451addfc000fab37555f7d82c4f6050406))
* 添加单测用例 ([23581ef](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/23581ef2cf6e535a81c87da4fe13814c97fb64dd))
* 添加readme, 部分代码优化 ([08bc505](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/08bc505258c20a8b763bb18ce9f2fd5043704773))
* 心跳重连 ([67445ba](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/67445ba178cdc4c7be404a49cdfb90470d7fbbb7))
* 优化心跳 ([7626e20](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/7626e20f6031fbb39623383ef05a6e19db3d81fc))
* add channel permissions openapis ([5b70182](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/5b7018235454d37a53aa994594b0493d58d943ef))
* add direct message openapi ([19e6cf6](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/19e6cf6581f3dddfc798db6f3768ed2775b4a598))
* add example ([b6e076b](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/b6e076b6f177af2d0d65e9c749e663653233a3a1))
* add meApi ([2f37b33](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/2f37b338954d93b37890a16f930ddccba2f86c9b))
* add openapi ([dfebe4a](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/dfebe4a667d49a238e0c1b1d7512a46669be8854))
* add openapis ([991dcd1](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/991dcd11c412b1a31cc608536337c4dbc891f28e))
* add resty-client ([05c213e](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/05c213e038752c915632c01db33eeb9c86f1b7b5))
* add user openapis ([171a5bd](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/171a5bd708964d1336a516c2a2f6a14f247c960f))
* guildMembers接口添加分页参数 ([4bd7a61](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/4bd7a615e8958e7d0ae1b6685d42a1d983d019bf))
* openapi design ([ea9a19a](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/ea9a19a65befbac74ae355aad0a8f6acecb5b298))
* orange-ci 自动化构建 ([ab1611c](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/ab1611c8fad3aa69cb615fb24df304e2b49e055f))
* register openapis ([d7f18d1](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/d7f18d14f3b1e11c859e86c480971895f0e825fd))
* SDK基础架构 ([7cca61c](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/7cca61c2da1a296b11588b8dedb313f7684184a3))
* tune the main process ([ec70a0b](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/ec70a0b370f0337409fdab7f239d849acd9d9b1f))
* websocket基础链接+心跳重连 ([2e330c8](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/2e330c8c95e270c7849ed493b0772ddd16274e81))
* ws监听事件优化,结构调整 ([cb91c8d](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/cb91c8db982f8ee3ca12a48b32401da81885fc98))
* ws优化 ([abf75cc](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/abf75cce3f96e704b2230f248a8b1c623e37461b))
* ws优化 ([0105a85](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/0105a8514ab13db3dc125ec7b7578041ec7d9233))
* wss请求地址优化 ([9fd4bcd](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/9fd4bcd475e0eb28ee9ece7fab9ea5dfc301bc4e))
* wss优化 ([6bb374e](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/6bb374e75c0e81360a2e17c04261336fa6cb808a))


### Bug Fixes

* 修正eslint校验 ([7e6cd0d](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/7e6cd0d3631bc963624bfb4d94b92e5a2f005be5))
* add fix openapis boundary ([0dc47e2](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/0dc47e25c435f7dec72207b737598fa61e19e31e))
* fix apis ([c183a39](https://git.woa.com/qq-channel-bot/bot-node-sdk/commit/c183a39fff8dfef8c8bd0c1bc5fa17cc410f5870))
