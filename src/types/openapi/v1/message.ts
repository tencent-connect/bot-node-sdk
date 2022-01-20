import { RestyResponse } from 'resty-client';
import { IMember } from './guild';
import { IUser } from './me';

/**
 * =============  Message 消息接口  =============
 */
export interface MessageAPI {
  message: (channelID: string, messageID: string) => Promise<RestyResponse<IMessageRes>>;
  messages: (channelID: string, pager: MessagesPager) => Promise<RestyResponse<IMessage[]>>;
  postMessage: (channelID: string, message: MessageToCreate) => Promise<RestyResponse<IMessage>>;
  deleteMessage: (channelID: string, messageID: string) => Promise<RestyResponse<any>>;
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

// 消息体结构
export interface MessageToCreate {
  content?: string;
  embed?: Embed;
  ark?: Ark;
  image?: string;
  msg_id?: string; // 要回复的消息id,不为空则认为是被动消息
}
