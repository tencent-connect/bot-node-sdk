const domain = 'api.sgroup.qq.com';
const sandBoxDomain = 'sandbox.api.sgroup.qq.com';
const scheme = 'https';

const apiMap = {
  guildURI: '/guilds/{guildId}',
  guildMembersURI: '/guilds/{guildId}/members',
  guildMemberURI: '/guilds/{guildId}/members/{userId}',
  channelsURI: '/guilds/{guildId}/channels',
  channelURI: '/channels/{channelId}',
  messagesURI: '/channels/{channelId}/messages',
  messageURI: '/channels/{channelId}/messages/{messageId}',
  userMeURI: '/users/@me',
  userMeGuildsURI: '/users/@me/guilds',
  gatewayURI: '/gateway',
  gatewayBotURI: '/gateway/bot',
  audioControlURI: '/channels/{channelId}/audio',
  rolesURI: '/guilds/{guildId}/roles/{roleId}',
  memberRoleURI: '/guilds/{guildId}/members/{userId}/roles/{roleId}',
};

export function getURL(endpoint: keyof typeof apiMap, sanbox?: boolean): string {
  let d = domain;
  if (sanbox) {
    d = sandBoxDomain;
  }
  return `${scheme}://${d}${apiMap[endpoint]}`;
}
