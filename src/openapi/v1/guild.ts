import { Config, OpenAPIRequest, GuildAPI, GuildMembersPager, IGuild, IMember, IVoiceMember } from '@src/types';
import { RestyResponse } from 'resty-client';
import { getURL } from './resource';

export default class Guild implements GuildAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 获取频道信息
  public guild(guildID: string): Promise<RestyResponse<IGuild>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildURI'),
      rest: {
        guildID,
      },
    };
    return this.request<IGuild>(options);
  }
  // 获取某个成员信息
  public guildMember(guildID: string, userID: string): Promise<RestyResponse<IMember>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildMemberURI'),
      rest: {
        guildID,
        userID,
      },
    };
    return this.request<IMember>(options);
  }
  // 获取频道成员列表
  public guildMembers(guildID: string, pager?: GuildMembersPager): Promise<RestyResponse<IMember[]>> {
    pager = pager || { after: '0', limit: 1 };
    const options = {
      method: 'GET' as const,
      url: getURL('guildMembersURI'),
      rest: {
        guildID,
      },
      params: pager,
    };
    return this.request<IMember[]>(options);
  }
  // 删除指定频道成员
  public deleteGuildMember(guildID: string, userID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL('guildMemberURI'),
      rest: {
        guildID,
        userID,
      },
    };
    return this.request(options);
  }
  // 语音子频道在线成员列表
  public guildVoiceMembers(channelID: string): Promise<RestyResponse<IVoiceMember[]>> {
    const options = {
      method: 'GET' as const,
      url: getURL('guildVoiceMembersURI'),
      rest: {
        channelID,
      },
    };
    return this.request<IVoiceMember[]>(options);
  }
}
