// 请求得到wss地址的参数
export interface GetWssParam {
  BotAppID: string;
  BotToken: string;
}

// 请求wss地址回包对象
export interface WssAddressObj {
  url: string;
  shards: number;
  session_start_limit: {
    total: number;
    remaining: number;
    reset_after: number;
    max_concurrency: number;
  }
}