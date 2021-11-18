// 配置文件
export const Package = require('../../package.json');
console.log(`sdk version: ${Package.version}`);

const keyMirror = (arr: Array<string>) => {
  const tmp = Object.create(null);
  arr.forEach(value => tmp[value] = value);
  return tmp;
};

const agent = '';
export const UserAgent = `${agent} (${Package.homepage.split('#')[0]}, ${Package.version}) Node.js/${process.version}`;

export const WSCodes = {
  1000: 'WS_CLOSE_REQUESTED',
  4004: 'TOKEN_INVALID',
  4010: 'SHARDING_INVALID',
  4011: 'SHARDING_REQUIRED',
  4013: 'INVALID_INTENTS',
  4014: 'DISALLOWED_INTENTS',
};


export const Status = {
  READY: 0,
  CONNECTING: 1,
  RECONNECTING: 2,
  IDLE: 3,
  NEARLY: 4,
  DISCONNECTED: 5,
  WAITING_FOR_GUILDS: 6,
  IDENTIFYING: 7,
  RESUMING: 8,
};


export const WebsocketEvent = {
  RAW_PACKET: 'rawPacket',
  SOCKET_OPEN: 'socketOpen',
  SOCKET_CLOSE: 'socketClose',
  UNPACK_ERROR: 'unpackError',
};

export const SessionStatus = {
  IDLE: 0,
  WS_OPEN: 1,
  IDENTIFYING: 2,
  READY: 3,
  RESUMING: 4,
  INVALID_SESSION: 5,
  CLOSING: 6,
  CLOSED: 7,
};

export const OPCodes = {
  DISPATCH: 0,
  HEARTBEAT: 1,
  IDENTIFY: 2,
  RESUME: 6,
  RECONNECT: 7,
  INVALID_SESSION: 9,
  HELLO: 10,
  HEARTBEAT_ACK: 11,
};

export const INTERNAL_EVENTS = {
  CLIENT_USER: 'clientUser',
};

export const Events = {
  READY: 'ready',
  CLOSED: 'closed',
  DEBUG: 'debug',
  INVALID_SESSION: 'invalidSession',

  CHANNEL_CREATE: 'channelCreate',
  CHANNEL_DELETE: 'channelDelete',
  CHANNEL_UPDATE: 'channelUpdate',
  GUILD_CREATE: 'guildCreate',
  GUILD_DELETE: 'guildDelete',
  GUILD_UPDATE: 'guildUpdate',
  GUILD_MEMBER_ADD: 'guildMemberAdd',
  GUILD_MEMBER_REMOVE: 'guildMemberRemove',
  GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
  MESSAGE_CREATE: 'messageCreate',
  MESSAGE_DELETE: 'messageDelete',
  MESSAGE_UPDATE: 'messageUpdate',
};

export const SessionEvents = {
  DEBUG: 'debug',
  CLOSED: 'closed',
  PACKET: 'packet',
  READY: 'ready',
  INVALID_SESSION: 'invalidSession',
};

export const WSEvents = keyMirror([
  'READY',
  'RESUMED',
  'CHANNEL_CREATE',
  'CHANNEL_DELETE',
  'CHANNEL_UPDATE',
  'GUILD_CREATE',
  'GUILD_DELETE',
  'GUILD_UPDATE',
  'GUILD_MEMBER_ADD',
  'GUILD_MEMBER_REMOVE',
  'GUILD_MEMBER_UPDATE',
  'MESSAGE_CREATE',
  'MESSAGE_DELETE',
  'MESSAGE_UPDATE',
]);

export const MessageTypes = {
  DEFAULT: 0,
};

exports.MessageEmbedType = {
  RICH: 'rich',
};

export const ChannelTypes = {
  TEXT: 0,
  DM: 1,
  VOICE: 2,
  GROUP: 3,
  CATEGORY: 4,
  NEWS: 5,
  STORE: 6,
};

export const RoleNames = {
  0: 'NORMAL',
  1: 'ADMIN',
  2: 'OWNER',
};


export const Intents = {
  GUILDS: 0,
  GUILD_MEMBERS: 1,
  GUILD_BANS: 2,
  GUILD_EMOJIS: 3,
  GUILD_INTEGRATIONS: 4,
  GUILD_WEBHOOKS: 5,
  GUILD_INVITES: 6,
  GUILD_VOICE_STATES: 7,
  GUILD_PRESENCES: 8,
  GUILD_MESSAGES: 9,
  GUILD_MESSAGE_REACTIONS: 10,
  GUILD_MESSAGE_TYPING: 11,
  DIRECT_MESSAGES: 12,
  DIRECT_MESSAGE_REACTIONS: 13,
  DIRECT_MESSAGE_TYPING: 14,
};

export const IntentEvents = [
  [  // 0
    'GUILD_CREATE',
    'GUILD_UPDATE',
    'GUILD_DELETE',
    'GUILD_ROLE_CREATE',
    'GUILD_ROLE_UPDATE',
    'GUILD_ROLE_DELETE',
    'CHANNEL_CREATE',
    'CHANNEL_UPDATE',
    'CHANNEL_DELETE',
    'CHANNEL_PINS_UPDATE',
  ],
  [  // 1
    'GUILD_MEMBER_ADD',
    'GUILD_MEMBER_UPDATE',
    'GUILD_MEMBER_REMOVE',
  ],
  [  // 2
    'GUILD_BAN_ADD',
    'GUILD_BAN_REMOVE',
  ],
  [  // 3
    'GUILD_EMOJIS_UPDATE',
  ],
  [  // 4
    'GUILD_INTEGRATIONS_UPDATE',
    'INTEGRATION_CREATE',
    'INTEGRATION_UPDATE',
    'INTEGRATION_DELETE',

  ],
  [  // 5
    'WEBHOOKS_UPDATE',

  ],
  [  // 6
    'INVITE_CREATE',
    'INVITE_DELETE',

  ],
  [  // 7
    'VOICE_STATE_UPDATE',

  ],
  [  // 8
    'PRESENCE_UPDATE',

  ],
  [  // 9
    'MESSAGE_CREATE',
    'MESSAGE_UPDATE',
    'MESSAGE_DELETE',
    'MESSAGE_DELETE_BULK',

  ],
  [  // 10
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'MESSAGE_REACTION_REMOVE_EMOJI',

  ],
  [  // 11
    'TYPING_START',

  ],
  [  // 12
    'MESSAGE_CREATE',
    'MESSAGE_UPDATE',
    'MESSAGE_DELETE',
    'CHANNEL_PINS_UPDATE',

  ],
  [  // 13
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'MESSAGE_REACTION_REMOVE_EMOJI',

  ],
  [  // 14
    'TYPING_START',
  ],
];

export const DefaultOptions = {
  shardCount: 1,
  fetchAllMembers: false,
  restRequestTimeout: 15000,
  retryLimit: 1,
  restTimeOffset: 500,
  restSweepInterval: 60,
  identifyLimit: 3,
  debug: false,
  shards: '',

  ws: {
    compress: false,
    properties: {
      $os: process.platform,
      $browser: `${exports.SdkName}.js`,
      $device: `${exports.SdkName}.js`,
    },
  },

  http: {
    api: 'https://api.sgroup.qq.com',
    debugAPI: 'https://sandbox.api.sgroup.qq.com',
  },
};