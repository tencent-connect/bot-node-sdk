const domain = 'api.sgroup.qq.com';
const sandBoxDomain = 'sandbox.api.sgroup.qq.com';
const scheme = 'https';

const apiMap = {
  guildURI: '/guilds/:guildID',
  guildMembersURI: '/guilds/:guildID/members',
  guildMemberURI: '/guilds/:guildID/members/:userID',
  channelsURI: '/guilds/:guildID/channels',
  channelURI: '/channels/:channelID',
  messagesURI: '/channels/:channelID/messages',
  messageURI: '/channels/:channelID/messages/:messageID',
  userMeURI: '/users/@me',
  userMeGuildsURI: '/users/@me/guilds',
  gatewayURI: '/gateway',
  gatewayBotURI: '/gateway/bot',
  audioControlURI: '/channels/:channelID/audio',
  rolesURI: '/guilds/:guildID/roles',
  roleURI: '/guilds/:guildID/roles/:roleID',
  memberRoleURI: '/guilds/:guildID/members/:userID/roles/:roleID',
};

export function getURL(endpoint: keyof typeof apiMap, sanbox?: boolean): string {
  let d = domain;
  if (sanbox) {
    d = sandBoxDomain;
  }
  return `${scheme}://${d}${apiMap[endpoint]}`;
}
