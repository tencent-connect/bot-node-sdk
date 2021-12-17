import { Config, MessageAPI, OpenAPIRequest } from '@src/types/openapi';
import { RestyResponse } from 'resty-client';
import { IMember } from './guild';
import { IUser } from './me';
import { getURL } from './resource';

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

// 消息对象(Message)
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

// 接口返回的数据多一层message
export interface IMessageRes {
  message: IMessage;
}

// MessagesPager 消息分页
export interface MessagesPager {
  // around: 读此id前后的消息	before:读此id之前的消息 after:读此id之后的消息
  type: 'around' | 'before' | 'after'; // 拉取类型
  id: string; // 消息ID
  limit: string; // 最大20
}

export interface MessageToCreate {
  content: string;
  embed: Embed;
  ark: Ark;
  image: string;
  msg_id: string; // 要回复的消息id,不为空则认为是被动消息
}
export default class Message implements MessageAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }
  // 获取指定消息
  public message(channelID: string, messageID: string): Promise<RestyResponse<IMessageRes>> {
    const options = {
      method: 'GET' as const,
      url: getURL('messageURI'),
      rest: {
        channelID,
        messageID,
      },
    };
    return this.request<IMessageRes>(options);
  }
  // 获取消息列表
  public messages(channelID: string, pager?: MessagesPager): Promise<RestyResponse<IMessage[]>> {
    const params = Object.create(null);
    if (pager && pager.type && pager.id) {
      params[pager.type] = pager.id;
      params.limit = pager.limit || 20;
    }

    const options = {
      method: 'GET' as const,
      url: getURL('messagesURI'),
      rest: {
        channelID,
      },
      params,
    };
    return this.request<IMessage[]>(options);
  }

  // 发送消息
  public postMessage(channelID: string, message: MessageToCreate): Promise<RestyResponse<IMessage>> {
    const options = {
      method: 'POST' as const,
      url: getURL('messagesURI'),
      rest: {
        channelID,
      },
      data: message,
    };
    return this.request<IMessage>(options);
  }
}
