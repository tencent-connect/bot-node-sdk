import { creatWebsocket } from '@src/bot';
import { OpenAPI } from '@src/openapi/v1/openapi';

// openapi测试使用的config
const testConfig = {
  appID: '',
  token: '',
  timeout: 3000,
  intents: ['GUILDS', 'GUILD_MEMBERS', 'DIRECT_MESSAGE', 'AUDIO_ACTION', 'AT_MESSAGES'],
  shards: [0, 10],
};

export const REQUEST_SUCCESS_CODE = 200;
export const REQUEST_SUCCESS_CODE_WITH_NO_CONTENT = 204;

export const guildID = '';
export const userID = '';
export const channelID = '';

export const ROLE_GOOLDEN_ADMIN_ID = '';

export const client = OpenAPI.newClient(testConfig);

export const newWsClient = () => creatWebsocket(testConfig);
