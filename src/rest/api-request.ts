import https from 'https';
import { GetWssParam } from '../types/qqbot-types';

export class HttpsService {
  static async getWss(config: GetWssParam): Promise<any> {
    // 如果没有传入机器人信息，直接返回
    if (!config.BotAppID || !config.BotToken) return;
    const apiToken = `Bot ${config.BotAppID}.${config.BotToken}`;
    const option={
      hostname:'api.sgroup.qq.com',
      path:'/gateway/bot',
      headers:{
        'Accept':'*/*',
        'Accept-Encoding':'utf-8',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Cookie':'',
        'Authorization': apiToken,
      }
    };
    return await https.get(option, (response) => {
      response.on('data', (data: any) => {
        console.log(`data: ${data}`);
        // return data;
      });
    
      response.on('end', (data1: any) => {
        console.log(`data1: ${data1}`);
        // return data1;
      });
    
    }).on("error", (error) => {
      console.log(`error: ${error.message}`);
    });
  }
}