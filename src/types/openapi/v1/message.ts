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
  deleteMessage: (channelID: string, messageID: string, hideTip?: boolean) => Promise<RestyResponse<any>>;
}

// MessageAttachment 附件定义
export interface MessageAttachment {
  url: string;
}

export interface EmbedThumbnail {
  url: string;
}
// EmbedField Embed字段描述

export interface EmbedField {
  name: string; // 字段名
}
export interface Embed {
  title: string;
  description?: string;
  prompt?: string;
  thumbnail?: EmbedThumbnail;
  fields?: EmbedField[];
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
  seq?: number; // 用于消息间的排序
  seq_in_channel?: string; // 子频道消息 seq
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

export interface MessageReference {
  message_id: string; // 需要引用回复的消息 ID
  ignore_get_message_error?: boolean; // 是否忽略获取引用消息详情错误，默认否（如不忽略，当获取引用消息详情出错时，消息将不会发出）
}

// 消息体结构
export interface MessageToCreate {
  content?: string;
  embed?: Embed;
  ark?: Ark;
  message_reference?: MessageReference;
  image?: string;
  msg_id?: string; // 要回复的消息id,不为空则认为是被动消息,公域机器人会异步审核，不为空是被动消息，公域机器人会校验语料
  keyboard?: MessageKeyboard;
}

// MessageKeyboard 消息按钮组件
export interface MessageKeyboard {
  id?: string;
  content?: CustomKeyboard;
}

// CustomKeyboard 自定义 Keyboard
export interface CustomKeyboard {
  rows?: Row[];
}

// Row 每行结构
export interface Row {
  buttons?: Button[];
}

// Button 单个按纽
export interface Button {
  id?: string; // 按钮 ID
  render_data?: RenderData; // 渲染展示字段
  action?: Action; // 该按纽操作相关字段
}

// RenderData  按纽渲染展示
export interface RenderData {
  label?: string; // 按纽上的文字
  visited_label?: string; // 点击后按纽上文字
  style?: number; // 按钮样式，0：灰色线框，1：蓝色线框
}

// Action 按纽点击操作
export interface Action {
  type?: number; // 操作类型
  permission?: Permission; // 可操作
  click_limit?: number; // 可点击的次数, 默认不限
  data?: string; // 操作相关数据
  at_bot_show_channel_list?: boolean; // false:当前 true:弹出展示子频道选择器
}

// Permission 按纽操作权限
export interface Permission {
  type?: number; // PermissionType 按钮的权限类型
  specify_role_ids?: string[]; // SpecifyRoleIDs 身份组
  specify_user_ids?: string[]; // SpecifyUserIDs 指定 UserID
}
