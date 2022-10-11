export interface Api {
  send: (channel: string, data: unknown) => void;
  sendSync: (channel: string, data?: unknown) => unknown;
  on: (channel: string, listener: (event: any, ...arg: any) => void) => void;
  once: (channel: string, listener: (event: any, ...arg: any) => void) => void;
  removeListener: (channel: string, listener: (event: any, ...arg: any) => void) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    api: Api;
  }
}
