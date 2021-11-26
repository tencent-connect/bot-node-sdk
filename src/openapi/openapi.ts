import { IOpenAPI } from '@src/types/openapi';

export const versionMapping = Object.create(null);

// TODO 去除magic number
const successStatusSet = {
  // StatusOK
  200: true,
  // StatusCreated
  201: true,
  // StatusAccepted
  202: true,
  // StatusNoContent
  204: true,
};

export function register(version: number, api: IOpenAPI) {
  versionMapping[version] = api;
}

export function isSuccessStatus(code: number): boolean {
  if (successStatusSet[code as keyof typeof successStatusSet]) {
    return true;
  }
  return false;
}
