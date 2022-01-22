const domain = 'api.sgroup.qq.com';
const sandBoxDomain = 'sandbox.api.sgroup.qq.com';
const scheme = 'https';

export const apiMap = {
  guildURI: '/guilds/:guildID',
  guildMembersURI: '/guilds/:guildID/members',
  guildMemberURI: '/guilds/:guildID/members/:userID',
  channelsURI: '/guilds/:guildID/channels',
  channelURI: '/channels/:channelID',
  guildAnnouncesURI: '/guilds/:guildID/announces',
  guildAnnounceURI: '/guilds/:guildID/announces/:messageID',
  channelAnnouncesURI: '/channels/:channelID/announces',
  channelAnnounceURI: '/channels/:channelID/announces/:messageID',
  messagesURI: '/channels/:channelID/messages',
  messageURI: '/channels/:channelID/messages/:messageID',
  userMeURI: '/users/@me',
  userMeGuildsURI: '/users/@me/guilds',
  muteURI: '/guilds/:guildID/mute',
  muteMemberURI: '/guilds/:guildID/members/:userID/mute',
  gatewayURI: '/gateway',
  gatewayBotURI: '/gateway/bot',
  audioControlURI: '/channels/:channelID/audio',
  rolesURI: '/guilds/:guildID/roles',
  roleURI: '/guilds/:guildID/roles/:roleID',
  memberRoleURI: '/guilds/:guildID/members/:userID/roles/:roleID',
  userMeDMURI: '/users/@me/dms',
  dmsURI: '/dms/:guildID/messages',
  channelPermissionsURI: '/channels/:channelID/members/:userID/permissions',
  channelRolePermissionsURI: '/channels/:channelID/roles/:roleID/permissions',
  schedulesURI: '/channels/:channelID/schedules',
  scheduleURI: '/channels/:channelID/schedules/:scheduleID',
  wsInfo: '/gateway/bot',
};

export const getURL = (sandbox?: boolean) => (endpoint: keyof typeof apiMap): string => {
  let d = domain;
  if (sandbox) {
    d = sandBoxDomain;
  }
  return `${scheme}://${d}${apiMap[endpoint]}`;
}
