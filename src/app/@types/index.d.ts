export interface Api {
  send: (channel: string, data: unknown) => void;
  sendSync: (channel: string, data: unknown) => unknown;
  receive: (channel: string, listener: (event: any, ...arg: any) => void) => void;
}

declare global {
  interface Window {
    api: Api;
  }
}
