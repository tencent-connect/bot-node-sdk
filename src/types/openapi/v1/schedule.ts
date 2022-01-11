import { IMember } from './guild';
import { RestyResponse } from 'resty-client';

/**
 * =============  Schedule 日程接口  =============
 */
export interface ScheduleAPI {
  // 获取日程信息
  schedule: (channelID: string, scheduleID: string) => Promise<RestyResponse<ISchedule>>;

  // 获取日程列表
  schedules: (channelID: string, since?: string) => Promise<RestyResponse<ISchedule[]>>;

  // 创建日程
  postSchedule: (channelID: string, schedule: ScheduleToCreate) => Promise<RestyResponse<ISchedule>>;

  // 修改日程
  patchSchedule: (
    channelID: string,
    scheduleID: string,
    schedule: ScheduleToPatch,
  ) => Promise<RestyResponse<ISchedule>>;

  // 删除日程
  deleteSchedule: (channelID: string, scheduleID: string) => Promise<RestyResponse<any>>;
}

// 0 - 不提醒
// 1 - 开始时提醒
// 2 - 开始前5分钟提醒
// 3 - 开始前15分钟提醒
// 4 - 开始前30分钟提醒
// 5 - 开始前60分钟提醒
export type ScheduleRemindType = '0' | '1' | '2' | '3' | '4' | '5';

export interface ScheduleToCreate {
  name: string; // 日程名称
  description?: string; // 日程描述
  creator?: IMember; // 创建者
  start_timestamp: string; // 日程开始时间戳(ms)
  end_timestamp: string; // 日程结束时间戳(ms)
  jump_channel_id?: string; // 日程开始时跳转到的子频道 id
  remind_type: ScheduleRemindType; // 日程提醒类型
}

export interface ISchedule extends ScheduleToCreate {
  id: string; // 日程 id
}

export type ScheduleToPatch = Partial<Omit<ISchedule, 'id'>>;
