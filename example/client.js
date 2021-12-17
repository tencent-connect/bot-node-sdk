import { newOpenAPI } from '@tencent/bot-node-sdk';

const testConfig = {
  appID: '',
  token: '',
};

export const client = newOpenAPI(testConfig);
