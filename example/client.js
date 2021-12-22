import { creatOpenAPI } from '@tencent-connect/bot-node-sdk';

const testConfig = {
  appID: '',
  token: '',
};

export const client = creatOpenAPI(testConfig);
