// 请求得到wss地址的参数
export interface GetWssParam {
  appID: string;
  token: string;
  shards: Array<number>;
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
  };
}
