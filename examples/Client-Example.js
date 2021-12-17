'use strict';

import { qqBot } from '../src/index';

const testConfig = {
  botAppID: '',
  token: '',
  secret: '',
  guildID: '',
};

class Test {
  async testAPI () {
    qqBot.get();
    // this.client = await QQ.qq.newClient({
    //   token: testConfig.token,
    //   shardCount: 1,
    //   shards:[0],
    //   debug: true,
    // });
  }
}
const test = new Test().testAPI();