import {Config, ISchedule, OpenAPIRequest, ScheduleAPI, ScheduleToCreate, ScheduleToPatch} from '@src/types';
import {RestyResponse} from 'resty-client';
import {getURL} from './resource';

export default class Schedule implements ScheduleAPI {
  public request: OpenAPIRequest;
  public config: Config;

  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 获取日程列表
  public schedules(channelID: string, since?: string): Promise<RestyResponse<ISchedule[]>> {
    if (since && since.length !== 13) {
      return Promise.reject(new Error("Param 'since' is invalid, millisecond timestamp expected！"));
    }
    const options = {
      method: 'GET' as const,
      url: getURL(this.config.sandbox)('schedulesURI'),
      rest: {
        channelID,
      },
      params: {
        since,
      },
    };
    return this.request<ISchedule[]>(options);
  }

  // 获取日程
  public schedule(channelID: string, scheduleID: string): Promise<RestyResponse<ISchedule>> {
    const options = {
      method: 'GET' as const,
      url: getURL(this.config.sandbox)('scheduleURI'),
      rest: {
        channelID,
        scheduleID,
      },
    };
    return this.request<ISchedule>(options);
  }

  // 创建日程
  public postSchedule(channelID: string, schedule: ScheduleToCreate): Promise<RestyResponse<ISchedule>> {
    const options = {
      method: 'POST' as const,
      url: getURL(this.config.sandbox)('schedulesURI'),
      rest: {
        channelID,
      },
      data: {
        schedule,
      },
    };
    return this.request<ISchedule>(options);
  }

  // 修改日程
  public patchSchedule(
    channelID: string,
    scheduleID: string,
    schedule: ScheduleToPatch,
  ): Promise<RestyResponse<ISchedule>> {
    const options = {
      method: 'PATCH' as const,
      url: getURL(this.config.sandbox)('scheduleURI'),
      rest: {
        channelID,
        scheduleID,
      },
      data: {
        schedule,
      },
    };
    return this.request<ISchedule>(options);
  }

  // 删除日程
  public deleteSchedule(channelID: string, scheduleID: string): Promise<RestyResponse<any>> {
    const options = {
      method: 'DELETE' as const,
      url: getURL(this.config.sandbox)('scheduleURI'),
      rest: {
        channelID,
        scheduleID,
      },
    };
    return this.request<any>(options);
  }
}
