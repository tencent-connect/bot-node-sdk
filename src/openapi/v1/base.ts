import { IBase } from '@src/types/openapi';

export default class Base implements IBase {
  token = '';
  timeout = 0;
  body = {};
  sandbox = false;
  debug = false;
  new() {}
  withTimeout() {}
  withBody() {}
  transport() {}
  version() {}
  request() {}
  respInfo() {}
}
