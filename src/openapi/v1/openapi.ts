import { IOpenAPI } from '../../types/openapi';

export default class OpenAPI implements IOpenAPI {
  token: any;
  timeout: number;
  body: any;
  sandbox: boolean;
  debug: boolean;
  New() {}
  WithTimeout() {}
  WithBody() {}
  Transport() {}
  Version() {}
  request() {}
  respInfo() {}
}
