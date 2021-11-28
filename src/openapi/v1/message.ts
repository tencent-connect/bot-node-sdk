import { Config, MessageAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IMember } from './guild';
import { getURL } from './resource';

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  bot: boolean;
  union_openid: string; // 特殊关联应用的 openid
  union_user_account: string; // 机器人关联的用户信息，与union_openid关联的应用是同一个
}

// MessageAttachment 附件定义
export interface MessageAttachment {
  url: string;
}

// EmbedField Embed字段描述
export interface Embed {
  name: string;
  value: string;
}

// Ark 消息模版
export interface Ark {
  template_id: string; // ark 模版 ID
  kv: ArkKV[];
}

// ArkKV Ark 键值对
export interface ArkKV {
  key: string;
  value: string;
  obj: ArkObj[];
}

// ArkObj Ark 对象
export interface ArkObj {
  obj_kv: ArkObjKV[];
}

// ArkObjKV Ark 对象键值对
export interface ArkObjKV {
  key: string;
  value: string;
}
export interface IMessage {
  id: string; // 消息ID
  channel_id: string; // 子频道ID
  guild_id: string; // 频道ID
  content: string; // 内容
  timestamp: string; // 发送时间
  edited_timestamp: string; // 消息编辑时间
  mention_everyone: boolean; // 是否@all
  author: IUser;
  member: IMember; // 消息发送方Author的member属性，只是部分属性
  attachments: MessageAttachment[]; // 附件
  embeds: Embed[]; // 结构化消息-embeds
  mentions: IUser[]; // 消息中的提醒信息(@)列表
  ark: Ark; // ark 消息
  direct_message: boolean; // 私信消息
}

// MessagesPager 消息分页
export interface MessagesPager {
  Type: string; // 拉取类型
  ID: string; // 消息ID
  limit: string; // 最大 20
}

export interface MessageToCreate {
  content: string;
  embed: Embed;
  ark: Ark;
  image: string;
  msg_id: string; // 要回复的消息id,不为空则认为是被动消息
}
export default class Message implements MessageAPI {
  request: OpenAPIRequest;
  config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 获取指定消息
  public message(channelID: string, messageID: string): Promise<RestyResponse<IMessage>> {
    const options = {
      method: 'GET' as const,
      url: getURL('messageURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request<IMessage>(options);
  }
  public messages(channelID: string, pager: MessagesPager): Promise<RestyResponse<IMessage[]>> {
    const options = {
      method: 'GET' as const,
      url: getURL('messagesURI'),
      rest: {
        channelID,
      },
      // TODO
      params: pager,
    };
    return this.request<IMessage[]>(options);
  }

  public postMessage(channelID: string, message: MessageToCreate): Promise<RestyResponse<IMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL('messagesURI'),
      rest: {
        channelID,
      },
      data: {
        msg: message,
      },
    };
    return this.request<IMessage>(options);
  }
}
